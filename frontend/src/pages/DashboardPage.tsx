import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '../App';
import { AuthHeader } from '../components/AuthHeader';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Briefcase, DollarSign } from 'lucide-react';

type JobInfo = {
  job_id: number;
  job_title: string;
  company: string;
  job_location: string | null;
  job_type: string;
  duration: string | null;
  pay: number;
};

const JOBS_PER_PAGE = 3;

const USER_JOBS_API_URL = import.meta.env.VITE_GET_SAVED_API_URL;
const ALL_JOBS_API_URL = import.meta.env.VITE_API_URL;

function MaintenanceModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl p-8 sm:p-16 max-w-2xl w-full flex flex-col items-center text-center gap-8 animate-[fadeInScale_0.2s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-yellow-50 border-2 border-yellow-200 flex items-center justify-center">
          <svg
            className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>

        <div className="space-y-3">
          <h3 className="text-3xl sm:text-4xl font-semibold text-gray-900">
            Under Maintenance
          </h3>
          <p className="text-base sm:text-lg text-gray-500 leading-relaxed">
            Document uploads are temporarily unavailable. We're working on it and will have this feature back shortly.
          </p>
        </div>

        <button
          onClick={onClose}
          className="mt-2 w-full bg-blue-700 hover:bg-blue-800 text-white py-4 rounded-full font-medium text-lg transition-colors"
        >
          Got it
        </button>
      </div>

      <style>{`
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.95); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, tokens } = useAuth();
  const progress = 0;

  const [savedJobs, setSavedJobs] = useState<JobInfo[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<JobInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [savedPage, setSavedPage] = useState(0);
  const [appliedPage, setAppliedPage] = useState(0);
  const [showMaintenance, setShowMaintenance] = useState(false);

  useEffect(() => {
    async function loadJobs(retries = 2) {
      try {
        setLoading(true);
        setError(null);

        const cognitoSub = user?.sub;
        const token = tokens?.idToken;

        if (!cognitoSub) throw new Error('User not logged in');

        const userRes = await fetch(`${USER_JOBS_API_URL}?cognito_sub=${cognitoSub}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!userRes.ok) throw new Error('Failed to fetch user job lists');

        const userData: { saved_jobs: number[]; applied_jobs: number[] } = await userRes.json();

        const savedIds = Array.isArray(userData.saved_jobs) ? userData.saved_jobs : [];
        const appliedIds = Array.isArray(userData.applied_jobs) ? userData.applied_jobs : [];

        if (savedIds.length === 0 && appliedIds.length === 0) {
          setSavedJobs([]);
          setAppliedJobs([]);
          return;
        }

        const jobsRes = await fetch(ALL_JOBS_API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!jobsRes.ok) throw new Error('Failed to fetch job details');

        const allJobs: JobInfo[] = await jobsRes.json();
        const byId = new Map(allJobs.map(j => [j.job_id, j]));

        setSavedJobs(savedIds.map(id => byId.get(id)).filter(Boolean) as JobInfo[]);
        setAppliedJobs(appliedIds.map(id => byId.get(id)).filter(Boolean) as JobInfo[]);
      } catch (err: unknown) {
        if (retries > 0) {
          console.log(`Retrying... attempts left: ${retries}`);
          setTimeout(() => loadJobs(retries - 1), 1000);
          return;
        }

        console.error('Dashboard load error:', err);
        setError(err instanceof Error ? err.message : 'Failed to load jobs');
      } finally {
        setLoading(false);
      }
    }

    loadJobs();
  }, [user, tokens]);

  const savedTotal = Math.max(1, Math.ceil(savedJobs.length / JOBS_PER_PAGE));
  const appliedTotal = Math.max(1, Math.ceil(appliedJobs.length / JOBS_PER_PAGE));

  const savedVisible = savedJobs.slice(savedPage * JOBS_PER_PAGE, (savedPage + 1) * JOBS_PER_PAGE);
  const appliedVisible = appliedJobs.slice(appliedPage * JOBS_PER_PAGE, (appliedPage + 1) * JOBS_PER_PAGE);

  const JobCard = ({ job }: { job: JobInfo }) => (
    <div
      onClick={() => navigate(`/jobs/${job.job_id}`, { state: { from: location.pathname } })}
      className="group bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 hover:shadow-md hover:border-green-300 hover:-translate-y-1 transition-all duration-200 cursor-pointer"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-green-100 text-green-700 flex items-center justify-center font-bold text-sm shrink-0">
          {job.company.charAt(0).toUpperCase()}
        </div>
        <span className="text-gray-500 text-sm truncate">{job.company}</span>
      </div>

      <h4 className="text-sm sm:text-base font-semibold mb-3 group-hover:text-green-700 leading-tight line-clamp-2">
        {job.job_title}
      </h4>

      <div className="space-y-1.5 text-xs text-gray-500">
        <div className="flex items-center gap-1.5">
          <MapPin size={12} className="shrink-0" />
          <span className="truncate">{job.job_location ?? 'Location not specified'}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <Briefcase size={12} className="shrink-0" />
          <span>{job.job_type}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <DollarSign size={12} className="shrink-0" />
          <span>${Number(job.pay).toLocaleString()}</span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 group-hover:border-green-100 transition-colors">
        <span className="text-green-600 text-xs font-medium">View role →</span>
      </div>
    </div>
  );

  const CarouselNav = ({
    page,
    total,
    onPrev,
    onNext,
    onDot,
  }: {
    page: number;
    total: number;
    onPrev: () => void;
    onNext: () => void;
    onDot: (i: number) => void;
  }) => (
    <div className="flex items-center gap-2 self-start sm:self-auto">
      <div className="flex gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => onDot(i)}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === page ? 'bg-green-600' : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

      <button
        onClick={onPrev}
        disabled={page === 0}
        className="p-1 border rounded-full disabled:opacity-30 hover:border-green-400 transition-colors"
      >
        <ChevronLeft size={16} />
      </button>

      <button
        onClick={onNext}
        disabled={page === total - 1}
        className="p-1 border rounded-full disabled:opacity-30 hover:border-green-400 transition-colors"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );

  const EmptyState = ({ message }: { message: string }) => (
    <div className="md:col-span-2 xl:col-span-3 text-center text-gray-400 py-8 border-2 border-dashed border-gray-200 rounded-2xl text-sm">
      {message}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#eeede9] pt-3 sm:pt-5">
      <AuthHeader title="Dashboard" />

      {showMaintenance && (
        <MaintenanceModal onClose={() => setShowMaintenance(false)} />
      )}

      <div className="px-3 py-4 sm:px-5 sm:py-6 lg:px-8 lg:py-6 grid grid-cols-1 xl:grid-cols-[minmax(320px,380px)_1fr] gap-5 items-start">
        <div className="flex flex-col gap-5 h-full">
          <div className="bg-white shadow-md rounded-3xl border border-gray-200 p-4 sm:p-6 flex flex-col flex-grow justify-between items-center text-center">
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-[32px] font-semibold text-gray-900 leading-tight">
                Welcome back,<br />{user?.name}!
              </h2>
              <p className="text-sm text-gray-500">Here's your progress overview</p>
            </div>

            <div className="relative w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 my-3">
              <svg
                className="w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 -rotate-90"
                viewBox="0 0 224 224"
              >
                <circle
                  cx="112"
                  cy="112"
                  r="85"
                  stroke="#f0f0f0"
                  strokeWidth="16"
                  fill="none"
                />

                <circle
                  cx="112"
                  cy="112"
                  r="85"
                  stroke="#1D9E75"
                  strokeWidth="16"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 85}
                  strokeDashoffset={2 * Math.PI * 85 * (1 - progress / 100)}
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl sm:text-4xl font-semibold">
                  {progress}%
                </span>
                <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wide">
                  Complete
                </span>
              </div>
            </div>

            <div className="space-y-0.5">
              <p className="text-xs text-gray-500">Current Degree</p>
              <p className="text-sm font-medium text-gray-800">
                No Degree Track Selected
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 w-full mt-3">
              {[
                { label: 'Credits', value: '0' },
                { label: 'Semesters', value: '0' },
                { label: 'GPA', value: '0' },
              ].map(stat => (
                <div key={stat.label} className="bg-gray-100 rounded-md p-3">
                  <p className="text-base sm:text-lg font-medium">
                    {stat.value}
                  </p>
                  <p className="text-[10px] uppercase text-gray-500">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white shadow-md rounded-3xl border border-gray-200 p-4 sm:p-6 flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
              Documents
            </h3>

            {[
              { label: 'Upload Transcript', border: 'border-gray-200 hover:border-blue-400' },
              { label: 'Upload Resume', border: 'border-gray-200 hover:border-green-400' },
            ].map(item => (
              <button
                key={item.label}
                type="button"
                onClick={() => setShowMaintenance(true)}
                className={`flex items-center justify-center gap-2 border-2 border-dashed ${item.border} rounded-xl p-4 cursor-pointer hover:bg-gray-50 transition-colors`}
              >
                <span className="text-sm font-medium text-gray-600 text-center">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5 bg-white rounded-3xl p-4 sm:p-6 shadow-md border border-gray-100">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1 sm:mb-3">
            Job Overview
          </h2>

          {loading && (
            <div className="text-center text-gray-400 py-16 text-sm">
              Loading your jobs…
            </div>
          )}

          {!loading && error && (
            <div className="text-center text-red-400 py-16 text-sm">
              {error} —{' '}
              <button
                onClick={() => window.location.reload()}
                className="underline hover:text-red-600 transition-colors"
              >
                retry
              </button>
            </div>
          )}

          {!loading && !error && (
            <>
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 sm:p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                    Saved <span className="text-sm text-gray-400 font-normal ml-1">({savedJobs.length})</span>
                  </h3>

                  <CarouselNav
                    page={savedPage}
                    total={savedTotal}
                    onPrev={() => setSavedPage(p => Math.max(0, p - 1))}
                    onNext={() => setSavedPage(p => Math.min(savedTotal - 1, p + 1))}
                    onDot={setSavedPage}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {savedVisible.length > 0
                    ? savedVisible.map(job => <JobCard key={job.job_id} job={job} />)
                    : <EmptyState message="No saved jobs yet" />
                  }
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 sm:p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                    Applied <span className="text-sm text-gray-400 font-normal ml-1">({appliedJobs.length})</span>
                  </h3>

                  <CarouselNav
                    page={appliedPage}
                    total={appliedTotal}
                    onPrev={() => setAppliedPage(p => Math.max(0, p - 1))}
                    onNext={() => setAppliedPage(p => Math.min(appliedTotal - 1, p + 1))}
                    onDot={setAppliedPage}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {appliedVisible.length > 0
                    ? appliedVisible.map(job => <JobCard key={job.job_id} job={job} />)
                    : <EmptyState message="No applied jobs yet" />
                  }
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}