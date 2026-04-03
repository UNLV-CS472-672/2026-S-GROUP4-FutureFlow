import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { AuthHeader } from '../components/AuthHeader';

export default function JobCenterPage() {
  const navigate = useNavigate();
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

  return (
    <div className="min-h-screen bg-gray-50 pt-5 flex flex-col">
      <AuthHeader title="Job Center" />

      {/* Search Bar Section */}
      <div className="p-8 space-y-8 flex-grow flex flex-col justify-center">
        <div className="text-center">
          <h2 className="text-5xl mb-6 text-green-700">Explore Jobs</h2>

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

      {/* Main Content */}
      <div className="mx-8 mb-8">
        <div className="bg-white rounded-3xl p-12 shadow-lg">
          <div className="text-center border-gray-200 px-8">
            <h3 className="text-4xl mb-6">Featured Jobs</h3>
            <button
              onClick={() => navigate('/jobs')}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full transition-colors"
            >
              Job Listings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}