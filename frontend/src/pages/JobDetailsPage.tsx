import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { AuthHeader } from '../components/AuthHeader';
import { useJobs } from '../hooks/useJobs';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useAuth } from '../App';

const SAVE_JOBS_API_URL = import.meta.env.VITE_SAVE_JOBS_API_URL;

type SkillMatch = {
  match_score: number;
  matched_skills: string[] | string;
  missing_skills: string[] | string;
  cached?: boolean;
};

function parseSkills(value: string[] | string | undefined): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value;

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function JobDetailPage() {
  const { id } = useParams();
  const { tokens } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { jobs, loading, error } = useJobs();

  const [isSaved, setIsSaved] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // TEMP MOCK DATA — remove when backend skill match API is ready
  const mockSkillMatch: SkillMatch = {
  match_score: 0,
  matched_skills: [
    'N/A',
  ],
  missing_skills: [
    'N/A',
  ],
};

  const from = location.state?.from || '/jobs';
  const job = jobs.find((j) => j.job_id === Number(id));

  const updateJobStatus = async (
    jobId: number,
    action: 'save' | 'unsave' | 'apply' | 'unapply'
  ) => {
    const token = tokens?.idToken;

    if (!token) throw new Error('Not authenticated');

    const res = await fetch(SAVE_JOBS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ job_id: jobId, action }),
    });

    if (!res.ok) throw new Error('Failed to update job status');
    return res.json();
  };

  useEffect(() => {
    const savedJobs: number[] = JSON.parse(localStorage.getItem('saved_jobs') || '[]');
    const appliedJobs: number[] = JSON.parse(localStorage.getItem('applied_jobs') || '[]');

    if (job) {
      setIsSaved(savedJobs.includes(job.job_id));
      setIsApplied(appliedJobs.includes(job.job_id));
    }
  }, [job]);

  const handleSave = async () => {
    if (!job) return;

    setActionLoading(true);

    try {
      const action = isSaved ? 'unsave' : 'save';
      const result = await updateJobStatus(job.job_id, action);

      setIsSaved(!isSaved);
      localStorage.setItem('saved_jobs', JSON.stringify(result.saved_jobs));
      localStorage.setItem('applied_jobs', JSON.stringify(result.applied_jobs));
    } catch (e) {
      console.error(e);
    } finally {
      setActionLoading(false);
    }
  };

  const handleApply = async () => {
    if (!job || isApplied) return;

    setActionLoading(true);

    if (job.link) {
      window.open(job.link, '_blank', 'noopener,noreferrer');
    }

    try {
      const result = await updateJobStatus(job.job_id, 'apply');

      setIsApplied(true);
      setIsSaved(false);
      localStorage.setItem('saved_jobs', JSON.stringify(result.saved_jobs));
      localStorage.setItem('applied_jobs', JSON.stringify(result.applied_jobs));
    } catch (e) {
      console.error(e);
    } finally {
      setActionLoading(false);
    }
  };

  const handleUnapply = async () => {
    if (!job || !isApplied) return;

    setActionLoading(true);

    try {
      const result = await updateJobStatus(job.job_id, 'unapply');

      setIsApplied(false);
      localStorage.setItem('saved_jobs', JSON.stringify(result.saved_jobs));
      localStorage.setItem('applied_jobs', JSON.stringify(result.applied_jobs));
    } catch (e) {
      console.error(e);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#eeede9] pt-3 sm:pt-5">
        <AuthHeader title="Job Details" />
        <div className="px-4 py-8 text-center text-gray-400 text-base sm:text-lg mt-10 sm:mt-16">
          Loading...
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-[#eeede9] pt-3 sm:pt-5">
        <AuthHeader title="Job Details" />
        <div className="px-4 py-8 text-center text-gray-500 text-base sm:text-lg mt-10 sm:mt-16">
          {error || 'Job not found.'}{' '}
          <button onClick={() => navigate('/jobs')} className="text-green-600 underline">
            Back to listings
          </button>
        </div>
      </div>
    );
  }

  const logoLetter = job.company.charAt(0).toUpperCase();
  const payLabel = job.pay ? `$${job.pay.toLocaleString()}` : 'Pay not listed';
  let pay_period = job.pay > 1000 ? '/Annually' : '/Hr';

  if (job.pay == null) {
    pay_period = '';
  }

  const typeLabel = job.job_type === 'internship' ? 'Internship' : 'Full-time';
  const typeStyle =
    job.job_type === 'internship'
      ? 'bg-blue-100 text-blue-700'
      : 'bg-green-100 text-green-700';

  const isRemote = job.job_location?.toLowerCase() === 'remote';

  const activeSkillMatch = mockSkillMatch;
  const matchedSkills = parseSkills(activeSkillMatch.matched_skills);
  const missingSkills = parseSkills(activeSkillMatch.missing_skills);

  return (
    <div className="min-h-screen bg-[#eeede9] pt-3 sm:pt-5">
      <AuthHeader title="Job Details" />

      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <button
          onClick={() => navigate(from)}
          className="text-sm text-gray-500 hover:text-gray-700 mb-4 sm:mb-6 flex items-center gap-1 transition-colors"
        >
          ← Back
        </button>

        <section className="bg-white rounded-3xl p-5 sm:p-6 lg:p-8 shadow-lg mb-4">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 min-w-0 flex-1">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center font-medium text-lg sm:text-xl shrink-0">
                {logoLetter}
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="text-2xl sm:text-3xl text-gray-900 mb-1 leading-tight break-words">
                  {job.job_title}
                </h2>

                <p className="text-sm sm:text-base text-gray-500 mb-3 break-words">
                  {job.company}
                  {job.job_location ? ` · ${job.job_location}` : ''}
                </p>

                <div className="flex flex-wrap gap-2">
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${typeStyle}`}>
                    {typeLabel}
                  </span>

                  {isRemote && (
                    <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-500">
                      Remote
                    </span>
                  )}

                  {job.duration && (
                    <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-500">
                      {job.duration}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="sm:text-right shrink-0">
              <p className="text-lg sm:text-xl font-medium text-gray-800 break-words">
                {payLabel}
                {pay_period}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-gray-100">
            <button
              onClick={isApplied ? handleUnapply : handleApply}
              disabled={actionLoading}
              className={`w-full sm:flex-1 ${
                isApplied
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-green-600 hover:bg-green-700'
              } disabled:opacity-50 text-white py-3 rounded-full font-medium transition-colors text-sm sm:text-base`}
            >
              {isApplied ? 'Withdraw Application' : 'Apply now'}
            </button>

            <button
              onClick={handleSave}
              disabled={actionLoading || isApplied}
              title={isSaved ? 'Unsave job' : 'Save job'}
              className="w-full sm:w-12 h-12 flex items-center justify-center rounded-full border-2 border-gray-200 hover:border-green-400 transition-colors disabled:opacity-40"
            >
              {isSaved ? (
                <BookmarkCheck size={20} className="text-green-600" />
              ) : (
                <Bookmark size={20} className="text-gray-400" />
              )}
            </button>
          </div>
        </section>

        <section className="bg-white rounded-3xl p-5 sm:p-6 lg:p-8 shadow-lg mb-4">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
            Your Skill Match
          </h3>

          <div className="space-y-5">
            <div>
              <p className="text-4xl sm:text-5xl font-semibold text-green-700">
                {activeSkillMatch.match_score}%
              </p>
              <p className="text-sm sm:text-base text-gray-500 mt-1">
                Match score for this job
              </p>
            </div>

            <div>
              <h4 className="text-sm sm:text-base font-semibold text-gray-800 mb-2">
                Matched Skills
              </h4>

              <div className="flex flex-wrap gap-2">
                {matchedSkills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs sm:text-sm px-3 py-1 rounded-full bg-green-100 text-green-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm sm:text-base font-semibold text-gray-800 mb-2">
                Missing Skills
              </h4>

              <div className="flex flex-wrap gap-2">
                {missingSkills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs sm:text-sm px-3 py-1 rounded-full bg-red-100 text-red-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {job.job_description && (
          <section className="bg-white rounded-3xl p-5 sm:p-6 lg:p-8 shadow-lg mb-4">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">
              Job Description
            </h3>

            <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed whitespace-pre-line break-words">
              {job.job_description}
            </p>
          </section>
        )}
      </main>
    </div>
  );
}