import { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthHeader } from '../components/AuthHeader';

const DEGREES = [
  {
    id: 1,
    title: 'Bachelor of Science in Computer Science',
    university: 'University of Nevada, Las Vegas',
    logo: 'E',
    logoColor: '#4285F4',
    location: 'Las Vegas, NV',
    college: 'College of Engineering',
  },
  {
    id: 2,
    title: 'Bachelor of Science in Business Administration, Finance',
    university: 'University of Nevada, Las Vegas',
    logo: 'E',
    logoColor: '#4285F4',
    location: 'Las Vegas, NV',
    college: 'Lee Business School',
  },
];

export default function ExploreDegreePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('q') || '');

  const filteredDegrees = useMemo(() => {
    const q = search.toLowerCase();

    return DEGREES.filter((degree) => {
      return (
        !q ||
        degree.title.toLowerCase().includes(q) ||
        degree.university.toLowerCase().includes(q) ||
        degree.college.toLowerCase().includes(q) ||
        degree.location.toLowerCase().includes(q)
      );
    });
  }, [search]);

  return (
    <div className="min-h-screen bg-gray-50 pt-5">
      <AuthHeader title="Degree Search" />

      <div className="p-8 max-w-5xl mx-auto">
        {/* Search bar */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search degrees, universities, colleges, or locations..."
            className="flex-1 bg-white border-2 border-green-600 rounded-full px-6 py-3 outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
          />

          <button
            onClick={() => navigate('/degree-center')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-full transition-colors text-sm"
          >
            ← Back
          </button>
        </div>

        <p className="text-sm text-gray-400 mb-4">
          {filteredDegrees.length} result{filteredDegrees.length !== 1 ? 's' : ''}
        </p>

        {/* Degree cards */}
        <div className="space-y-3">
          {filteredDegrees.length === 0 ? (
            <div className="bg-white rounded-3xl p-16 text-center text-gray-400 shadow-lg">
              No degrees match your search.
            </div>
          ) : (
            filteredDegrees.map((degree) => (
              <div
                key={degree.id}
                onClick={() => navigate(`/degrees/${degree.id}`)}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-green-400 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  {/* Logo */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center font-medium text-base flex-shrink-0"
                    style={{
                      background: degree.logoColor + '18',
                      color: degree.logoColor,
                      border: `1px solid ${degree.logoColor}35`,
                    }}
                  >
                    {degree.logo}
                  </div>

                  {/* Degree info */}
                  <div className="flex-1 min-w-0">
                    <h2 className="font-medium text-gray-900 text-base">
                      {degree.title}
                    </h2>

                    <p className="text-sm text-gray-500 mt-0.5">
                      {degree.university} · {degree.location}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                        {degree.college}
                      </span>
                    </div>

                    
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}