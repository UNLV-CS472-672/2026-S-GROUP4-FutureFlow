import mariadb from 'mariadb';
import { CognitoJwtVerifier } from 'aws-jwt-verify';

// MariaDB pool
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 5
});

// Cognito verifier
const verifier = CognitoJwtVerifier.create({
  userPoolId: process.env.COGNITO_USER_POOL_ID,
  tokenUse: "access",
  clientId: process.env.COGNITO_APP_CLIENT_ID
});

// --- DB helpers ---
async function getJobSkills(job_id) {
  const conn = await pool.getConnection();
  try {
    const rows = await conn.query("SELECT extracted_skills FROM job_info WHERE job_id = ?", [job_id]);
    if (rows.length === 0) throw new Error("Job not found");
    return rows[0].extracted_skills || [];
  } finally {
    conn.release();
  }
}

async function getUserSkills(userSub) {
  const conn = await pool.getConnection();
  try {
    const rows = await conn.query("SELECT skills FROM user_info WHERE cognito_sub = ?", [userSub]);
    if (rows.length === 0) throw new Error("User not found");
    return rows[0].skills || [];
  } finally {
    conn.release();
  }
}

async function getExistingMatch(userSub, jobId) {
  const conn = await pool.getConnection();
  try {
    const rows = await conn.query(
      "SELECT * FROM skill_matches WHERE user_sub = ? AND job_id = ?",
      [userSub, jobId]
    );
    return rows[0] || null;
  } finally {
    conn.release();
  }
}

async function saveMatchResult(userSub, jobId, matchResult) {
  const conn = await pool.getConnection();
  try {
    await conn.query(
      `INSERT INTO skill_matches (user_sub, job_id, match_score, matched_skills, missing_skills)
       VALUES (?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE 
       match_score = VALUES(match_score),
       matched_skills = VALUES(matched_skills),
       missing_skills = VALUES(missing_skills),
       created_at = CURRENT_TIMESTAMP`,
      [userSub, jobId, matchResult.score, JSON.stringify(matchResult.matched), JSON.stringify(matchResult.missing)]
    );
  } finally {
    conn.release();
  }
}

function computeMatch(jobSkills, userSkills) {
  const matched = jobSkills.filter(skill => userSkills.includes(skill));
  const missing = jobSkills.filter(skill => !userSkills.includes(skill));
  const score = Math.round((matched.length / (jobSkills.length || 1)) * 100);
  return { score, matched, missing };
}

// --- Lambda handler ---
export async function handler(event) {
  try {
    const { job_id } = JSON.parse(event.body);
    if (!job_id) return { statusCode: 400, body: JSON.stringify({ error: "job_id required" }) };

    // Extract accessToken
    const token = event.headers.Authorization?.split(" ")[1];
    if (!token) return { statusCode: 401, body: JSON.stringify({ error: "Missing accessToken" }) };

    // Verify token
    const payload = await verifier.verify(token);
    const userSub = payload.sub;

    // Check for existing match
    const existingMatch = await getExistingMatch(userSub, job_id);
    if (existingMatch) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          user_sub: userSub,
          job_id,
          match_score: existingMatch.match_score,
          matched_skills: existingMatch.matched_skills,
          missing_skills: existingMatch.missing_skills,
          cached: true
        })
      };
    }

    // Compute new match
    const [jobSkills, userSkills] = await Promise.all([
      getJobSkills(job_id),
      getUserSkills(userSub)
    ]);

    const matchResult = computeMatch(jobSkills, userSkills);

    // Save to DB
    await saveMatchResult(userSub, job_id, matchResult);

    return {
      statusCode: 200,
      body: JSON.stringify({
        user_sub: userSub,
        job_id,
        match_score: matchResult.score,
        matched_skills: matchResult.matched,
        missing_skills: matchResult.missing,
        cached: false
      })
    };

  } catch (err) {
    console.error("Handler error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}