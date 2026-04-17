import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { AuthHeader } from '../components/AuthHeader';
import { ChevronLeft, ChevronRight, MapPin, Briefcase, DollarSign } from 'lucide-react';

// featured job carousel elements
// Mock featured jobs data — replace with real data from your API
const FEATURED_JOBS = [
  { id: 1, title: 'Software Engineer', company: 'Google', location: 'Mountain View, CA', type: 'Full-time', salary: '$140k–$180k', logo: 'G' },
  { id: 2, title: 'Product Manager', company: 'Apple', location: 'Cupertino, CA', type: 'Full-time', salary: '$130k–$160k', logo: 'A' },
  { id: 3, title: 'UX Designer', company: 'Meta', location: 'Remote', type: 'Full-time', salary: '$120k–$150k', logo: 'M' },
  { id: 4, title: 'Data Scientist', company: 'Netflix', location: 'Los Gatos, CA', type: 'Full-time', salary: '$150k–$190k', logo: 'N' },
  { id: 5, title: 'Backend Engineer', company: 'Stripe', location: 'San Francisco, CA', type: 'Full-time', salary: '$145k–$175k', logo: 'S' },
  { id: 6, title: 'DevOps Engineer', company: 'Airbnb', location: 'Remote', type: 'Contract', salary: '$110k–$140k', logo: 'Ab' },
  { id: 7, title: 'Frontend Engineer', company: 'Figma', location: 'San Francisco, CA', type: 'Full-time', salary: '$130k–$160k', logo: 'F' },
  { id: 8, title: 'Machine Learning Engineer', company: 'OpenAI', location: 'San Francisco, CA', type: 'Full-time', salary: '$160k–$200k', logo: 'O' },
  { id: 9, title: 'Marketing Manager', company: 'Spotify', location: 'New York, NY', type: 'Full-time', salary: '$100k–$130k', logo: 'Sp' },
];

const JOBS_PER_PAGE = 3;
const TOTAL_PAGES = Math.ceil(FEATURED_JOBS.length / JOBS_PER_PAGE);

export default function JobCenterPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // job carousel
  const [currentPage, setCurrentPage] = useState(0);

  // search functionality on the job center page
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {                            // searching when clicking button
    e.preventDefault();
    navigate(`/jobs?q=${encodeURIComponent(searchQuery)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {     // searching when hitting enter
    if (e.key === 'Enter') {
      navigate(`/jobs?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  // navigating the featured jobs carousel
  const handlePrev = () => setCurrentPage((p) => Math.max(0, p - 1));
  const handleNext = () => setCurrentPage((p) => Math.min(TOTAL_PAGES - 1, p + 1));

  const visibleJobs = FEATURED_JOBS.slice(
    currentPage * JOBS_PER_PAGE,
    currentPage * JOBS_PER_PAGE + JOBS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-gray-[#eeede9] pt-5 flex flex-col">
      <AuthHeader title="Job Center" />

      {/* Search Bar Section */}
      <div className="p-8 space-y-8 flex-grow flex flex-col">
        <div className="text-center">
          <h2 className="p-8 text-5xl text-green-700">Explore Jobs</h2>

          {/* Pill-shaped container wrapping both input and button */}
          <div className="max-w-3xl mx-auto flex items-center bg-white border-2 border-green-600 rounded-full px-3 py-2 focus-within:ring-2 focus-within:ring-green-500 gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search jobs, companies, or skills..."
              className="flex-1 bg-transparent px-4 py-2 outline-none text-gray-700 placeholder-gray-400"
            />
            <button
              onClick={handleSearch}
              className="bg-green-600 hover:bg-green-700 text-white px-7 py-3 rounded-full font-medium transition-colors whitespace-nowrap shrink-0"
            >
              Search Jobs
            </button>
          </div>

          <p className="text-gray-400 text-sm mt-3">
            Press Enter or click Search Jobs to see all listings
          </p>
        </div>
      </div>

      {/* Featured Jobs Section */}
      <div className="mx-8 mb-8">
        <div className="bg-white rounded-3xl p-10 shadow-lg">

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-semibold text-gray-800">Featured Jobs</h3>
            <div className="flex items-center gap-3">
              {/* Page dots */}
              <div className="flex gap-2">
                {Array.from({ length: TOTAL_PAGES }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      i === currentPage ? 'bg-green-600' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
              {/* Arrow buttons */}
              <button
                onClick={handlePrev}
                disabled={currentPage === 0}
                className="p-2 rounded-full border-2 border-gray-200 hover:border-green-500 hover:text-green-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={handleNext}
                disabled={currentPage === TOTAL_PAGES - 1}
                className="p-2 rounded-full border-2 border-gray-200 hover:border-green-500 hover:text-green-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Job Cards Grid */}
          <div className="grid grid-cols-3 gap-6">
            {visibleJobs.map((job) => (
              <button
                key={job.id}
                onClick={() => navigate(`/jobs/${job.id}`, {state: {from: location.pathname}})}
                className="text-left bg-gray-50 hover:bg-green-50 border-2 border-gray-100 hover:border-green-400 rounded-2xl p-6 transition-all duration-200 group shadow-sm hover:shadow-md"
              >
                {/* Company logo placeholder + company name */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-green-100 text-green-700 font-bold text-sm flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    {job.logo}
                  </div>
                  <span className="text-gray-500 text-sm font-medium">{job.company}</span>
                </div>

                {/* Job title */}
                <h4 className="text-lg font-semibold text-gray-800 mb-4 group-hover:text-green-700 transition-colors leading-tight">
                  {job.title}
                </h4>

                {/* Meta info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <MapPin size={14} className="shrink-0" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Briefcase size={14} className="shrink-0" />
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <DollarSign size={14} className="shrink-0" />
                    <span>{job.salary}</span>
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

          {/* Footer link */}
          <div className="text-center mt-8">
            <button
              onClick={() => navigate('/jobs')}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full transition-colors font-medium"
            >
              Browse All Jobs
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}