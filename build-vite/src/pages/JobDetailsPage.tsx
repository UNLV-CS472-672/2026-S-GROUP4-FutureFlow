import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { AuthHeader } from '../components/AuthHeader';
import { useJobs } from '../hooks/useJobs';

export default function JobDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { jobs, loading, error } = useJobs();

  const from = location.state?.from || '/jobs';
  const job = jobs.find((j) => j.job_id === Number(id));

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
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center font-medium text-lg sm:text-xl flex-shrink-0">
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

          {/* Apply button */}
          <div className="flex gap-3 mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-gray-100">
            <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-full font-medium transition-colors text-sm sm:text-base">
              Apply now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}