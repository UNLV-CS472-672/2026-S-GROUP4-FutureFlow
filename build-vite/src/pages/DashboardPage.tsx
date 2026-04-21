import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '../App';
import { AuthHeader } from '../components/AuthHeader';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Briefcase, DollarSign } from 'lucide-react';

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  logo: string;
  status: string;
  notes: string;
  updatedAt: string;
};

const FEATURED_JOBS: Job[] = [
  { id: 1, title: 'Software Engineer', company: 'Google', location: 'Mountain View, CA', type: 'Full-time', salary: '$140k–$180k', logo: 'G', status: 'Saved', notes: '', updatedAt: '' },
  { id: 2, title: 'Product Manager', company: 'Apple', location: 'Cupertino, CA', type: 'Full-time', salary: '$130k–$160k', logo: 'A', status: 'Saved', notes: '', updatedAt: '' },
  { id: 3, title: 'UX Designer', company: 'Meta', location: 'Remote', type: 'Full-time', salary: '$120k–$150k', logo: 'M', status: 'Saved', notes: '', updatedAt: '' },
  { id: 4, title: 'Data Scientist', company: 'Netflix', location: 'Los Gatos, CA', type: 'Full-time', salary: '$150k–$190k', logo: 'N', status: 'Applied', notes: '', updatedAt: '' },
  { id: 5, title: 'Backend Engineer', company: 'Stripe', location: 'San Francisco, CA', type: 'Full-time', salary: '$145k–$175k', logo: 'S', status: 'Applied', notes: '', updatedAt: '' },
  { id: 6, title: 'DevOps Engineer', company: 'Airbnb', location: 'Remote', type: 'Contract', salary: '$110k–$140k', logo: 'Ab', status: 'Applied', notes: '', updatedAt: '' },
  { id: 7, title: 'Frontend Engineer', company: 'Figma', location: 'San Francisco, CA', type: 'Full-time', salary: '$130k–$160k', logo: 'F', status: 'Saved', notes: '', updatedAt: '' },
  { id: 8, title: 'Machine Learning Engineer', company: 'OpenAI', location: 'San Francisco, CA', type: 'Full-time', salary: '$160k–$200k', logo: 'O', status: 'Applied', notes: '', updatedAt: '' },
  { id: 9, title: 'Marketing Manager', company: 'Spotify', location: 'New York, NY', type: 'Full-time', salary: '$100k–$130k', logo: 'Sp', status: 'Saved', notes: '', updatedAt: '' },
];

const JOBS_PER_PAGE = 3;

export default function DashboardPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const progress = 65;

  const [jobs, setJobs] = useState<Job[]>([]);
  const [savedPage, setSavedPage] = useState(0);
  const [appliedPage, setAppliedPage] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('jobs');
    if (saved) {
      const parsed: Job[] = JSON.parse(saved);
      setJobs(parsed.length > 0 ? parsed : FEATURED_JOBS);
    } else {
      setJobs(FEATURED_JOBS);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }, [jobs]);

  const savedJobs = jobs.filter(j => j.status === 'Saved');
  const appliedJobs = jobs.filter(j => j.status !== 'Saved');

  const savedTotal = Math.max(1, Math.ceil(savedJobs.length / JOBS_PER_PAGE));
  const appliedTotal = Math.max(1, Math.ceil(appliedJobs.length / JOBS_PER_PAGE));

  const savedVisible = savedJobs.slice(savedPage * JOBS_PER_PAGE, (savedPage + 1) * JOBS_PER_PAGE);
  const appliedVisible = appliedJobs.slice(appliedPage * JOBS_PER_PAGE, (appliedPage + 1) * JOBS_PER_PAGE);

  const JobCard = ({ job }: { job: Job }) => (
    <div
      onClick={() => navigate(`/jobs/${job.id}`, { state: { from: location.pathname } })}
      className="group bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 hover:shadow-md hover:border-green-300 hover:-translate-y-1 transition-all duration-200 cursor-pointer"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-green-100 text-green-700 flex items-center justify-center font-bold text-sm shrink-0">
          {job.logo}
        </div>
        <span className="text-gray-500 text-sm truncate">{job.company}</span>
      </div>

      <h4 className="text-sm sm:text-base font-semibold mb-3 group-hover:text-green-700 leading-tight line-clamp-2">
        {job.title}
      </h4>

      <div className="space-y-1.5 text-xs text-gray-500">
        <div className="flex items-center gap-1.5">
          <MapPin size={12} className="shrink-0" />
          <span className="truncate">{job.location}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Briefcase size={12} className="shrink-0" />
          <span>{job.type}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <DollarSign size={12} className="shrink-0" />
          <span>{job.salary}</span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 group-hover:border-green-100 transition-colors">
        <span className="text-green-600 text-xs font-medium">View role →</span>
      </div>
    </div>
  );

  const CarouselNav = ({
    page, total, onPrev, onNext, onDot,
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

  return (
    <div className="min-h-screen bg-[#eeede9] pt-3 sm:pt-5">
      <AuthHeader title="Dashboard" />

      <div className="px-3 py-4 sm:px-5 sm:py-6 lg:px-8 lg:py-6 grid grid-cols-1 xl:grid-cols-[minmax(320px,380px)_1fr] gap-5 items-start">
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-5 h-full">
          {/* WELCOME CARD */}
          <div className="bg-white shadow-md rounded-3xl border border-gray-200 p-4 sm:p-6 flex flex-col justify-between items-center text-center">
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-[32px] font-semibold text-gray-900 leading-tight">
                Welcome back,<br />{user?.name}!
              </h2>
              <p className="text-sm text-gray-500">
                Here's your progress overview
              </p>
            </div>

            {/* PROGRESS RING */}
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 my-3">
              <svg className="w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 -rotate-90" viewBox="0 0 224 224">
                <circle cx="112" cy="112" r="85" stroke="#f0f0f0" strokeWidth="16" fill="none" />
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
                <span className="text-3xl sm:text-4xl font-semibold">{progress}%</span>
                <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wide">Complete</span>
              </div>
            </div>

            <div className="space-y-0.5">
              <p className="text-xs text-gray-500">Current Degree</p>
              <p className="text-sm font-medium text-gray-800">B.S. Computer Science</p>
            </div>

            <div className="grid grid-cols-3 gap-2 w-full mt-3">
              {[
                { label: 'Credits', value: '72' },
                { label: 'Semesters', value: '5' },
                { label: 'GPA', value: '3.6' },
              ].map(stat => (
                <div key={stat.label} className="bg-gray-100 rounded-md p-3">
                  <p className="text-base sm:text-lg font-medium">{stat.value}</p>
                  <p className="text-[10px] uppercase text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* DOCUMENTS */}
          <div className="bg-white shadow-md rounded-3xl border border-gray-200 p-4 sm:p-6 flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-400">Documents</h3>

            {[
              { label: 'Upload Transcript', border: 'border-gray-200 hover:border-blue-400' },
              { label: 'Upload Resume', border: 'border-gray-200 hover:border-green-400' },
            ].map(item => (
              <label
                key={item.label}
                className={`flex items-center justify-center gap-2 border-2 border-dashed ${item.border} rounded-xl p-4 cursor-pointer hover:bg-gray-50 transition-colors`}
              >
                <span className="text-sm font-medium text-gray-600 text-center">{item.label}</span>
                <input type="file" className="hidden" />
              </label>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-5 bg-white rounded-3xl p-4 sm:p-6 shadow-md border border-gray-100">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1 sm:mb-3">Job Overview</h2>

          {/* SAVED */}
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
              {savedVisible.length > 0 ? (
                savedVisible.map(job => <JobCard key={job.id} job={job} />)
              ) : (
                <div className="md:col-span-2 xl:col-span-3 text-center text-gray-400 py-8 border-2 border-dashed border-gray-200 rounded-2xl text-sm">
                  No saved jobs yet
                </div>
              )}
            </div>
          </div>

          {/* APPLIED */}
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
              {appliedVisible.length > 0 ? (
                appliedVisible.map(job => <JobCard key={job.id} job={job} />)
              ) : (
                <div className="md:col-span-2 xl:col-span-3 text-center text-gray-400 py-8 border-2 border-dashed border-gray-200 rounded-2xl text-sm">
                  No applied jobs yet
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}