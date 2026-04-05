import { useState, useMemo } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { AuthHeader } from '../components/AuthHeader';

// For now it shares the same static data as JobDetailsPage.
// When implemented, this file will take information using fetch/api
const JOBS = [
  {
    id: 1, title: 'Software Engineering Intern', company: 'Google', logo: 'G',
    logoColor: '#4285F4', location: 'Mountain View, CA', remote: false,
    type: 'internship', posted: '2026-03-24', matchScore: 95,
    salary: '$45/hr', tags: ['React', 'Python', 'APIs'],
    summary: 'Join the Google Search team to build next-generation features used by billions of users.',
    requirements: ['Currently enrolled in a CS or related degree', 'Experience with at least one OOP language', 'Strong problem-solving skills', 'Familiarity with data structures & algorithms'],
    responsibilities: ['Build and ship production features', 'Write clean, testable code', 'Participate in code reviews', 'Collaborate with cross-functional teams'],
  },
  {
    id: 2, title: 'Frontend Developer', company: 'Figma', logo: 'F',
    logoColor: '#1ABCFE', location: 'Remote', remote: true,
    type: 'full-time', posted: '2026-03-22', matchScore: 88,
    salary: '$120k–$150k', tags: ['React', 'TypeScript', 'CSS'],
    summary: 'Help design and build the future of collaborative design tools.',
    requirements: ['3+ years of frontend experience', 'Expert-level React & TypeScript', 'Eye for design and pixel-perfect implementation'],
    responsibilities: ['Own frontend features end-to-end', 'Improve rendering performance', 'Collaborate with design team'],
  },
  {
    id: 3, title: 'Data Science Intern', company: 'Spotify', logo: 'S',
    logoColor: '#1DB954', location: 'New York, NY', remote: false,
    type: 'internship', posted: '2026-03-20', matchScore: 82,
    salary: '$38/hr', tags: ['Python', 'SQL', 'ML'],
    summary: 'Work with Spotify\'s personalization team to improve music recommendations for 400M+ users.',
    requirements: ['Pursuing a degree in Statistics, CS, or Math', 'Proficiency in Python and SQL', 'Coursework in machine learning or statistics'],
    responsibilities: ['Analyze user behavior data', 'Build and evaluate ML models', 'A/B test new recommendation algorithms'],
  },
  {
    id: 4, title: 'Product Manager', company: 'Notion', logo: 'N',
    logoColor: '#000000', location: 'Remote', remote: true,
    type: 'full-time', posted: '2026-03-18', matchScore: 74,
    salary: '$130k–$160k', tags: ['Strategy', 'Roadmapping', 'Analytics'],
    summary: 'Lead product strategy for Notion\'s collaboration features.',
    requirements: ['4+ years in product management', 'Experience with B2B SaaS products', 'Strong written communication skills'],
    responsibilities: ['Define product vision and roadmap', 'Write clear product specs', 'Run user research sessions'],
  },
  {
    id: 5, title: 'Backend Engineer', company: 'Stripe', logo: 'S',
    logoColor: '#6772E5', location: 'San Francisco, CA', remote: false,
    type: 'full-time', posted: '2026-03-15', matchScore: 91,
    salary: '$160k–$200k', tags: ['Ruby', 'Go', 'PostgreSQL'],
    summary: 'Build the financial infrastructure that powers millions of businesses worldwide.',
    requirements: ['5+ years of backend engineering experience', 'Strong systems design skills', 'Experience with high-throughput distributed systems'],
    responsibilities: ['Design and build scalable APIs', 'Improve system reliability', 'Lead technical design reviews'],
  },
  {
    id: 6, title: 'UX Design Intern', company: 'Airbnb', logo: 'A',
    logoColor: '#FF5A5F', location: 'Remote', remote: true,
    type: 'internship', posted: '2026-03-13', matchScore: 78,
    salary: '$35/hr', tags: ['Figma', 'User Research', 'Prototyping'],
    summary: 'Join Airbnb\'s design team to help shape experiences for hosts and guests across the globe.',
    requirements: ['Portfolio showcasing UX process', 'Proficiency in Figma', 'Pursuing a degree in Design or HCI'],
    responsibilities: ['Conduct user research', 'Create wireframes and prototypes', 'Iterate based on feedback'],
  },
  {
    id: 7, title: 'Machine Learning Engineer', company: 'OpenAI', logo: 'O',
    logoColor: '#10A37F', location: 'San Francisco, CA', remote: false,
    type: 'full-time', posted: '2026-03-10', matchScore: 87,
    salary: '$180k–$250k', tags: ['PyTorch', 'Python', 'CUDA'],
    summary: 'Work on cutting-edge AI research and deployment at OpenAI.',
    requirements: ['PhD or equivalent experience in ML', 'Deep expertise in PyTorch or JAX', 'Experience with large-scale distributed training'],
    responsibilities: ['Train and evaluate large models', 'Build ML infrastructure', 'Collaborate with safety and policy teams'],
  },
  {
    id: 8, title: 'DevOps Intern', company: 'Cloudflare', logo: 'C',
    logoColor: '#F48120', location: 'Austin, TX', remote: false,
    type: 'internship', posted: '2026-03-08', matchScore: 69,
    salary: '$40/hr', tags: ['Kubernetes', 'Docker', 'CI/CD'],
    summary: 'Help Cloudflare scale its global network that serves trillions of requests per day.',
    requirements: ['Familiarity with Linux and shell scripting', 'Basic knowledge of containers (Docker/K8s)', 'Pursuing a CS or related degree'],
    responsibilities: ['Automate deployment pipelines', 'Monitor infrastructure health', 'Debug production incidents'],
  },
];

const PAGE_SIZE = 5;

function timeAgo(dateStr: string) {
  const days = Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return '1 day ago';
  if (days < 7) return `${days} days ago`;
  const weeks = Math.floor(days / 7);
  return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
}

export default function JobSearchPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [filterType, setFilterType] = useState('all');
  const [filterRemote, setFilterRemote] = useState('all');
  const [sortBy, setSortBy] = useState('match');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let jobs = JOBS.filter((j) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        j.tags.some((t) => t.toLowerCase().includes(q));
      const matchesType = filterType === 'all' || j.type === filterType;
      const matchesRemote =
        filterRemote === 'all' ||
        (filterRemote === 'remote' ? j.remote : !j.remote);
      return matchesSearch && matchesType && matchesRemote;
    });
    if (sortBy === 'match') jobs = [...jobs].sort((a, b) => b.matchScore - a.matchScore);
    if (sortBy === 'recent') jobs = [...jobs].sort((a, b) => new Date(b.posted).getTime() - new Date(a.posted).getTime());
    return jobs;
  }, [search, filterType, filterRemote, sortBy]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const setFilter = (setter: (v: string) => void) => (val: string) => {
    setter(val);
    setPage(1);
  };

  const scoreColor = (score: number) =>
    score >= 90 ? 'bg-green-100 text-green-700' : score >= 75 ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500';

  return (
    <div className="min-h-screen bg-gray-50 pt-5">
      <AuthHeader title="Job Search" />

      <div className="p-8 max-w-5xl mx-auto">

        {/* Search bar */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search jobs, companies, or skills..."
            className="flex-1 bg-white border-2 border-green-600 rounded-full px-6 py-3 outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
          />
          <button
            onClick={() => navigate('/job-center')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-full transition-colors text-sm"
          >
            ← Back
          </button>
        </div>

        {/* Filters row */}
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <span className="text-sm text-gray-400 mr-1">Type:</span>
          {[['all', 'All'], ['internship', 'Internship'], ['full-time', 'Full-time']].map(([val, label]) => (
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

          <span className="text-gray-300 mx-1">|</span>
          <span className="text-sm text-gray-400 mr-1">Location:</span>
          {[['all', 'All'], ['remote', 'Remote'], ['onsite', 'On-site']].map(([val, label]) => (
            <button
              key={val}
              onClick={() => setFilter(setFilterRemote)(val)}
              className={`text-sm px-4 py-2 rounded-full border transition-colors ${
                filterRemote === val
                  ? 'bg-blue-700 text-white border-blue-700'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-blue-500'
              }`}
            >
              {label}
            </button>
          ))}

          <div className="ml-auto flex items-center gap-2">
            <span className="text-sm text-gray-400">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
              className="text-sm border border-gray-300 rounded-full px-4 py-2 bg-white text-gray-700 outline-none cursor-pointer"
            >
              <option value="match">Best match</option>
              <option value="recent">Most recent</option>
            </select>
          </div>
        </div>

        <p className="text-sm text-gray-400 mb-4">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</p>

        {/* Job cards */}
        <div className="space-y-3 mb-6">
          {paginated.length === 0 ? (
            <div className="bg-white rounded-3xl p-16 text-center text-gray-400 shadow-lg">
              No jobs match your filters.
            </div>
          ) : paginated.map((job) => (
            <div
              key={job.id}
              onClick={() => navigate(`/jobs/${job.id}`, {state: {from: location.pathname}})}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-green-400 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-start gap-4">
                {/* Logo */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center font-medium text-base flex-shrink-0"
                  style={{ background: job.logoColor + '18', color: job.logoColor, border: `1px solid ${job.logoColor}35` }}
                >
                  {job.logo}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-gray-900 text-base">{job.title}</span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${scoreColor(job.matchScore)}`}>
                      {job.matchScore}% match
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-0.5">{job.company} · {job.location}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${job.type === 'internship' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                      {job.type === 'internship' ? 'Internship' : 'Full-time'}
                    </span>
                    {job.remote && (
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-500">Remote</span>
                    )}
                    {job.tags.slice(0, 3).map((t) => (
                      <span key={t} className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-500">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <p className="font-medium text-gray-800 text-sm">{job.salary}</p>
                  <p className="text-xs text-gray-400 mt-1">{timeAgo(job.posted)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2">
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