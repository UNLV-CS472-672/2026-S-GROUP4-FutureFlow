import json
import re

INPUT_FILE = "jobs.ndjson"
OUTPUT_FILE = "job_inserts.sql"

SKILL_KEYWORDS = [
    "ai", "machine learning", "data analysis", "data analytics", "sql",
    "python", "java", "c++", "aws", "cloud", "saas",
    "sales", "marketing", "digital marketing", "advertising",
    "customer success", "account management", "client relations",
    "business development", "strategy", "analytics",
    "project management", "program management",
    "leadership", "management", "negotiation",
    "communication", "presentation",
    "healthcare", "medical", "patient care",
    "operations", "supply chain",
    "finance", "accounting",
    "cybersecurity", "networking",
    "product management", "product strategy",
    "engineering", "software development",
    "agile", "scrum"
]


def escape_sql(value: str) -> str:
    return value.replace("'", "''")


def normalize_job_type(employment_type, title, description):
    text = " ".join([
        employment_type or "",
        title or "",
        description or ""
    ]).lower()

    if "intern" in text:
        return "internship"
    if any(k in text for k in ["contract", "freelance"]):
        return "contract"
    if "part time" in text or "part-time" in text:
        return "part-time"
    if "temp" in text:
        return "temporary"
    return "full-time"


def extract_skills(description):
    """Match against predefined skill list."""
    if not description:
        return []

    text = description.lower()
    found = []

    # Match longer phrases first
    for skill in sorted(SKILL_KEYWORDS, key=len, reverse=True):
        pattern = r"\b" + re.escape(skill) + r"\b"
        if re.search(pattern, text):
            found.append(skill)

    return found


def format_value(val):
    if val is None or val == "":
        return "NULL"
    return f"'{escape_sql(str(val))}'"


def main():
    rows = []
    job_id = 1

    with open(INPUT_FILE, "r", encoding="utf-8") as f:
        for line in f:
            data = json.loads(line)

            job_location = data.get("location")
            company = data.get("company")
            title = data.get("title")
            description = data.get("description")
            link = data.get("applyUrl")

            job_type = normalize_job_type(
                data.get("employmentType"),
                title,
                description
            )

            skills = extract_skills(description)
            skills_json = json.dumps(skills) if skills else None

            row = f"""(
{job_id},
{format_value(job_location)},
{format_value(company)},
NULL,
{format_value(title)},
{format_value(job_type)},
NULL,
{format_value(description)},
{format_value(link)},
{format_value(skills_json)}
)"""

            rows.append(row)
            job_id += 1

    sql = f"""INSERT INTO job_info (
job_id,
job_location,
company,
pay,
job_title,
job_type,
duration,
job_description,
link,
extracted_skills
)
VALUES
{",\n".join(rows)};
"""

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write(sql)

    print(f"Done. Wrote {len(rows)} rows to {OUTPUT_FILE}")


if __name__ == "__main__":
    main()