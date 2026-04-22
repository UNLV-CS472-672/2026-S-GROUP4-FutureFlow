import { useState, useMemo } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { AuthHeader } from '../components/AuthHeader';
import { useJobs } from '../hooks/useJobs';

const PAGE_SIZE = 5;

export default function JobSearchPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('title');
  const [page, setPage] = useState(1);

  const { jobs, loading, error } = useJobs();

  const filtered = useMemo(() => {
    let jobList = jobs.filter((j) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        j.job_title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        j.job_location?.toLowerCase().includes(q);

      const matchesType = filterType === 'all' || j.job_type === filterType;
      return matchesSearch && matchesType;
    });

    if (sortBy === 'title') {
      jobList = [...jobList].sort((a, b) => a.job_title.localeCompare(b.job_title));
    }

    if (sortBy === 'company') {
      jobList = [...jobList].sort((a, b) => a.company.localeCompare(b.company));
    }

    if (sortBy === 'pay') {
      jobList = [...jobList].sort((a, b) => b.pay - a.pay);
    }

    return jobList;
  }, [jobs, search, filterType, sortBy]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const setFilter = (setter: (v: string) => void) => (val: string) => {
    setter(val);
    setPage(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-3 sm:pt-5">
        <AuthHeader title="Job Search" />
        <div className="flex items-center justify-center h-64 text-gray-400 px-4 text-center">
          Loading jobs...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-3 sm:pt-5">
        <AuthHeader title="Job Search" />
        <div className="flex items-center justify-center h-64 text-red-500 px-4 text-center">
          Failed to load jobs: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#eeede9] pt-3 sm:pt-5">
      <AuthHeader title="Job Search" />

      <div className="px-3 py-4 sm:px-5 sm:py-6 lg:p-8 max-w-5xl mx-auto">
        {/* Search bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search jobs, companies, or locations..."
            className="flex-1 bg-white border-2 border-green-600 rounded-full px-5 sm:px-6 py-3 outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
          />

          <button
            onClick={() => navigate('/job-center')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-full transition-colors text-sm w-full sm:w-auto"
          >
            ← Back
          </button>
        </div>

        {/* Filters + sort */}
        <div className="flex flex-col gap-4 mb-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-400 mr-1">Type:</span>

            {[
              ['all', 'All'],
              ['Internship', 'Internship'],
              ['Full time', 'Full-time'],
              ['Part time', 'Part-time'],
            ].map(([val, label]) => (
              <button
                key={val}
                onClick={() => setFilter(setFilterType)(val)}
                className={`text-sm px-4 py-2 rounded-full border transition-colors ${
                  filterType === val
                    ? 'bg-green-600 text-white border-green-600'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-green-500'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 self-start sm:self-end">
            <span className="text-sm text-gray-400">Sort:</span>

            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setPage(1);
              }}
              className="text-sm border border-gray-300 rounded-full px-4 py-2 bg-white text-gray-700 outline-none cursor-pointer"
            >
              <option value="title">Title (A-Z)</option>
              <option value="company">Company (A-Z)</option>
              <option value="pay">Highest pay</option>
            </select>
          </div>
        </div>

        <p className="text-sm text-gray-400 mb-4">
          {filtered.length} result{filtered.length !== 1 ? 's' : ''}
        </p>

        {/* Job cards */}
        <div className="space-y-3 mb-6">
          {paginated.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 sm:p-16 text-center text-gray-400 shadow-lg">
              No jobs match your filters.
            </div>
          ) : (
            paginated.map((job) => (
              <div
                key={job.job_id}
                onClick={() =>
                  navigate(`/jobs/${job.job_id}`, {
                    state: { from: location.pathname },
                  })
                }
                className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:border-green-400 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  {/* Company avatar */}
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center font-semibold text-base flex-shrink-0 bg-green-50 text-green-700 border border-green-200">
                    {job.company.charAt(0).toUpperCase()}
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="font-medium text-gray-900 text-base">
                      {job.job_title}
                    </span>

                    <p className="text-sm text-gray-500 mt-0.5">
                      {job.company} · {job.job_location ?? 'Location not specified'}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          job.job_type === 'internship'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {job.job_type}
                      </span>

                      {job.duration && (
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-500">
                          {job.duration}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="sm:text-right flex-shrink-0">
                    <p className="font-medium text-gray-800 text-sm">
                      ${Number(job.pay).toLocaleString()}/hr
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-wrap justify-center items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-full border border-gray-300 text-sm text-gray-600 disabled:opacity-40 hover:border-green-500 transition-colors bg-white"
            >
              ← Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-9 h-9 rounded-full text-sm font-medium transition-colors ${
                  page === p
                    ? 'bg-green-600 text-white border-green-600'
                    : 'bg-white text-gray-600 border border-gray-300 hover:border-green-500'
                }`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-full border border-gray-300 text-sm text-gray-600 disabled:opacity-40 hover:border-green-500 transition-colors bg-white"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}