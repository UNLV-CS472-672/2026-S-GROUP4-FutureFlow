import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { AuthHeader } from '../components/AuthHeader';
import { ChevronLeft, ChevronRight, MapPin, Briefcase, DollarSign } from 'lucide-react';
import { useJobs } from '../hooks/useJobs';

const JOBS_PER_PAGE = 3;

export default function JobCenterPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { jobs, loading, error } = useJobs();

  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/jobs?q=${encodeURIComponent(searchQuery)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      navigate(`/jobs?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const featuredJobs = [...jobs]
    .sort((a, b) => b.pay - a.pay)
    .slice(0, 9);

  const totalPages = Math.ceil(featuredJobs.length / JOBS_PER_PAGE);

  const handlePrev = () => setCurrentPage((p) => Math.max(0, p - 1));
  const handleNext = () => setCurrentPage((p) => Math.min(totalPages - 1, p + 1));

  const visibleJobs = featuredJobs.slice(
    currentPage * JOBS_PER_PAGE,
    currentPage * JOBS_PER_PAGE + JOBS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-[#eeede9] pt-3 sm:pt-5 flex flex-col">
      <AuthHeader title="Job Center" />

      {/* Search Bar Section */}
      <div className="px-3 py-4 sm:px-5 sm:py-6 lg:p-8 space-y-6 sm:space-y-8 flex-grow flex flex-col">
        <div className="text-center">
          <h2 className="px-2 py-4 sm:p-6 lg:p-8 text-3xl sm:text-4xl lg:text-5xl text-green-700">
            Explore Jobs
          </h2>

          {/* Search container */}
          <form
            onSubmit={handleSearch}
            className="max-w-3xl mx-auto bg-white border-2 border-green-600 rounded-3xl sm:rounded-full px-3 py-3 sm:px-3 sm:py-2 focus-within:ring-2 focus-within:ring-green-500"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search jobs, companies, or skills..."
                className="flex-1 bg-transparent px-3 sm:px-4 py-2 outline-none text-gray-700 placeholder-gray-400 text-sm sm:text-base"
              />
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-6 sm:px-7 py-3 rounded-full font-medium transition-colors whitespace-nowrap shrink-0 w-full sm:w-auto"
              >
                Search Jobs
              </button>
            </div>
          </form>

          <p className="text-gray-400 text-sm mt-3 px-2">
            Press Enter or click Search Jobs to see all listings
          </p>
        </div>
      </div>

      {/* Featured Jobs Section */}
      <div className="px-3 pb-4 sm:px-5 sm:pb-6 lg:mx-8 lg:mb-8">
        <div className="bg-white rounded-3xl p-5 sm:p-8 lg:p-10 shadow-lg">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
            <h3 className="text-2xl sm:text-3xl font-semibold text-gray-800">Featured Jobs</h3>

            {loading || error ? null : (
              <div className="flex items-center gap-3 self-start sm:self-auto">
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${
                        i === currentPage ? 'bg-green-600' : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 0}
                  className="p-2 rounded-full border-2 border-gray-200 hover:border-green-500 hover:text-green-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages - 1}
                  className="p-2 rounded-full border-2 border-gray-200 hover:border-green-500 hover:text-green-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>

          {/* States */}
          {loading && (
            <p className="text-center text-gray-400 py-10">Loading featured jobs...</p>
          )}
          {error && (
            <p className="text-center text-red-500 py-10">{error}</p>
          )}

          {/* Job Cards Grid */}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {visibleJobs.map((job) => (
                <button
                  key={job.job_id}
                  onClick={() => navigate(`/jobs/${job.job_id}`, { state: { from: location.pathname } })}
                  className="text-left bg-gray-50 hover:bg-green-50 border-2 border-gray-100 hover:border-green-400 rounded-2xl p-5 sm:p-6 transition-all duration-200 group shadow-sm hover:shadow-md"
                >
                  {/* Company logo + name */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-green-100 text-green-700 font-bold text-sm flex items-center justify-center group-hover:bg-green-200 transition-colors shrink-0">
                      {job.company.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-gray-500 text-sm font-medium truncate">{job.company}</span>
                  </div>

                  {/* Job title */}
                  <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 group-hover:text-green-700 transition-colors leading-tight">
                    {job.job_title}
                  </h4>

                  {/* Meta info */}
                  <div className="space-y-2">
                    {job.job_location && (
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <MapPin size={14} className="shrink-0" />
                        <span>{job.job_location}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <Briefcase size={14} className="shrink-0" />
                      <span>{job.job_type}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <DollarSign size={14} className="shrink-0" />
                      <span>${Number(job.pay).toLocaleString()}</span>
                    </div>
                  </div>

                  {/* View role CTA */}
                  <div className="mt-5 pt-4 border-t border-gray-200 group-hover:border-green-200 transition-colors">
                    <span className="text-green-600 text-sm font-medium group-hover:underline">
                      View role →
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Footer link */}
          <div className="text-center mt-6 sm:mt-8">
            <button
              onClick={() => navigate('/jobs')}
              className="bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-3 rounded-full transition-colors font-medium w-full sm:w-auto"
            >
              Browse All Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}