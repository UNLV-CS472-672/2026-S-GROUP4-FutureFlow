import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { AuthHeader } from '../components/AuthHeader';
import { useJobs } from '../hooks/useJobs';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useAuth } from '../App';

const API_URL = import.meta.env.VITE_SAVE_JOBS_API_URL;

export default function JobDetailPage() {
  const { id } = useParams();
  const { tokens } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { jobs, loading, error } = useJobs();

  const [isSaved, setIsSaved] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const from = location.state?.from || '/jobs';
  const job = jobs.find((j) => j.job_id === Number(id));

  // ── Token sent in Authorization header — Lambda extracts sub from it using the API Gateway──
  const updateJobStatus = async (jobId: number, action: 'save' | 'unsave' | 'apply') => {
    const token = tokens?.idToken;

    if (!token) throw new Error('Not authenticated');

    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,  // Lambda verifies this and extracts sub using the API Gateway
      },
      body: JSON.stringify({ job_id: jobId, action }),
    });

    if (!res.ok) throw new Error('Failed to update job status');
    return res.json();
  };

  // Initialize saved/applied state from localStorage
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

    // Open the external link if available
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-[#eeede9] pt-5">
        <AuthHeader title="Job Details" />
        <div className="p-8 text-center text-gray-400 text-lg mt-16">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-[#eeede9] pt-5">
        <AuthHeader title="Job Details" />
        <div className="p-8 text-center text-red-500 text-lg mt-16">
          {error}{' '}
          <button onClick={() => navigate('/jobs')} className="text-green-600 underline">
            Back to listings
          </button>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-[#eeede9] pt-3 sm:pt-5">
        <AuthHeader title="Job Details" />
        <div className="px-4 py-8 text-center text-gray-500 text-base sm:text-lg mt-10 sm:mt-16">
          Job not found.{` `}
          <button onClick={() => navigate('/jobs')} className="text-green-600 underline">
            Back to listings
          </button>
        </div>
      </div>
    );
  }

  const logoLetter = job.company.charAt(0).toUpperCase();
  const payLabel = job.pay ? `$${job.pay.toLocaleString()}` : 'Pay not listed';
  const typeLabel = job.job_type === 'internship' ? 'Internship' : 'Full-time';
  const typeStyle = job.job_type === 'internship'
    ? 'bg-blue-100 text-blue-700'
    : 'bg-green-100 text-green-700';
  const isRemote = job.job_location?.toLowerCase() === 'remote';

  return (
    <div className="min-h-screen bg-[#eeede9] pt-3 sm:pt-5">
      <AuthHeader title="Job Details" />

      <div className="px-3 py-4 sm:px-5 sm:py-6 lg:p-8 max-w-4xl mx-auto">
        <button
          onClick={() => navigate(from)}
          className="text-sm text-gray-400 hover:text-gray-600 mb-4 sm:mb-6 flex items-center gap-1 transition-colors"
        >
          ← Back
        </button>

        {/* Header card */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 lg:p-8 shadow-lg mb-4">
          <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center font-medium text-lg sm:text-xl flex-shrink-0">
              {logoLetter}
            </div>

            <div className="flex-1 min-w-0">
              <h2 className="text-2xl sm:text-3xl text-gray-900 mb-1 leading-tight">{job.job_title}</h2>
              <p className="text-sm sm:text-base text-gray-500 mb-3">
                {job.company}{job.job_location ? ` · ${job.job_location}` : ''}
              </p>
              <div className="flex flex-wrap gap-2">
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${typeStyle}`}>
                  {typeLabel}
                </span>
                {isRemote && (
                  <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-500">Remote</span>
                )}
                {job.duration && (
                  <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-500">
                    {job.duration}
                  </span>
                )}
              </div>
            </div>

            <div className="text-right flex-shrink-0">
              <p className="text-lg sm:text-xl font-medium text-gray-800">{payLabel}</p>
            </div>
          </div>

          <div className="flex gap-3 mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-gray-100">
            <button
              onClick={handleApply}
              disabled={isApplied || actionLoading}
              className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-3 rounded-full font-medium transition-colors text-sm sm:text-base"
            >
              {isApplied ? 'Applied ✓' : job.link ? 'Apply now ↗' : 'Apply now'}
            </button>

            <button
              onClick={handleSave}
              disabled={actionLoading || isApplied}
              title={isSaved ? 'Unsave job' : 'Save job'}
              className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-gray-200 hover:border-green-400 transition-colors disabled:opacity-40"
            >
              {isSaved
                ? <BookmarkCheck size={20} className="text-green-600" />
                : <Bookmark size={20} className="text-gray-400" />
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}