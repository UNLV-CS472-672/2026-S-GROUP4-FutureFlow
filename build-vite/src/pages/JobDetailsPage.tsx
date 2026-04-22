import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { AuthHeader } from '../components/AuthHeader';

// In a real app this would be a fetch call: fetch(`/api/jobs/${id}`)
// For now it shares the same static data as JobSearchPage.
const JOBS = [
  {
    id: 1, title: 'Software Engineering Intern', company: 'Google', logo: 'G',
    logoColor: '#4285F4', location: 'Mountain View, CA', remote: false,
    type: 'internship', posted: '2026-03-24', matchScore: 95,
    salary: '$45/hr', tags: ['React', 'Python', 'APIs'],
    summary: 'Join the Google Search team to build next-generation features used by billions of users. You\'ll work alongside senior engineers on real production systems that serve billions of requests daily.',
    requirements: ['Currently enrolled in a CS or related degree', 'Experience with at least one OOP language', 'Strong problem-solving skills', 'Familiarity with data structures & algorithms'],
    responsibilities: ['Build and ship production features', 'Write clean, testable code', 'Participate in code reviews', 'Collaborate with cross-functional teams'],
  },
  {
    id: 2, title: 'Frontend Developer', company: 'Figma', logo: 'F',
    logoColor: '#1ABCFE', location: 'Remote', remote: true,
    type: 'full-time', posted: '2026-03-22', matchScore: 88,
    salary: '$120k–$150k', tags: ['React', 'TypeScript', 'CSS'],
    summary: 'Help design and build the future of collaborative design tools. You\'ll be embedded in a product team working on Figma\'s core editor experience used by millions of designers.',
    requirements: ['3+ years of frontend experience', 'Expert-level React & TypeScript', 'Eye for design and pixel-perfect implementation', 'Experience with performance optimization'],
    responsibilities: ['Own frontend features end-to-end', 'Improve rendering performance', 'Collaborate with design team', 'Mentor junior developers'],
  },
  {
    id: 3, title: 'Data Science Intern', company: 'Spotify', logo: 'S',
    logoColor: '#1DB954', location: 'New York, NY', remote: false,
    type: 'internship', posted: '2026-03-20', matchScore: 82,
    salary: '$38/hr', tags: ['Python', 'SQL', 'ML'],
    summary: 'Work with Spotify\'s personalization team to improve music recommendations for 400M+ users. You\'ll analyze large datasets and build ML models in production.',
    requirements: ['Pursuing a degree in Statistics, CS, or Math', 'Proficiency in Python and SQL', 'Coursework in machine learning or statistics', 'Strong analytical thinking'],
    responsibilities: ['Analyze user behavior data', 'Build and evaluate ML models', 'Present findings to stakeholders', 'A/B test new recommendation algorithms'],
  },
  {
    id: 4, title: 'Product Manager', company: 'Notion', logo: 'N',
    logoColor: '#000000', location: 'Remote', remote: true,
    type: 'full-time', posted: '2026-03-18', matchScore: 74,
    salary: '$130k–$160k', tags: ['Strategy', 'Roadmapping', 'Analytics'],
    summary: 'Lead product strategy for Notion\'s collaboration features. You\'ll work closely with engineering, design, and research to define and ship impactful products.',
    requirements: ['4+ years in product management', 'Experience with B2B SaaS products', 'Strong written communication skills', 'Data-driven decision making'],
    responsibilities: ['Define product vision and roadmap', 'Write clear product specs', 'Run user research sessions', 'Collaborate with engineering on delivery'],
  },
  {
    id: 5, title: 'Backend Engineer', company: 'Stripe', logo: 'S',
    logoColor: '#6772E5', location: 'San Francisco, CA', remote: false,
    type: 'full-time', posted: '2026-03-15', matchScore: 91,
    salary: '$160k–$200k', tags: ['Ruby', 'Go', 'PostgreSQL'],
    summary: 'Build the financial infrastructure that powers millions of businesses worldwide. You\'ll work on Stripe\'s core payments APIs that process billions of dollars annually.',
    requirements: ['5+ years of backend engineering experience', 'Strong systems design skills', 'Experience with high-throughput distributed systems', 'Proficiency in Ruby or Go'],
    responsibilities: ['Design and build scalable APIs', 'Improve system reliability and performance', 'Lead technical design reviews', 'Mentor engineers across the team'],
  },
  {
    id: 6, title: 'UX Design Intern', company: 'Airbnb', logo: 'A',
    logoColor: '#FF5A5F', location: 'Remote', remote: true,
    type: 'internship', posted: '2026-03-13', matchScore: 78,
    salary: '$35/hr', tags: ['Figma', 'User Research', 'Prototyping'],
    summary: 'Join Airbnb\'s design team to help shape experiences for hosts and guests across the globe. You\'ll own end-to-end design on real product surfaces.',
    requirements: ['Portfolio showcasing UX process', 'Proficiency in Figma', 'Strong visual design fundamentals', 'Pursuing a degree in Design or HCI'],
    responsibilities: ['Conduct user research', 'Create wireframes and prototypes', 'Present design decisions', 'Iterate based on feedback'],
  },
  {
    id: 7, title: 'Machine Learning Engineer', company: 'OpenAI', logo: 'O',
    logoColor: '#10A37F', location: 'San Francisco, CA', remote: false,
    type: 'full-time', posted: '2026-03-10', matchScore: 87,
    salary: '$180k–$250k', tags: ['PyTorch', 'Python', 'CUDA'],
    summary: 'Work on cutting-edge AI research and deployment at OpenAI. You\'ll train and fine-tune large language models and build the infrastructure to run them at scale.',
    requirements: ['PhD or equivalent experience in ML', 'Deep expertise in PyTorch or JAX', 'Experience with large-scale distributed training', 'Strong math and statistics background'],
    responsibilities: ['Train and evaluate large models', 'Build ML infrastructure', 'Publish research', 'Collaborate with safety and policy teams'],
  },
  {
    id: 8, title: 'DevOps Intern', company: 'Cloudflare', logo: 'C',
    logoColor: '#F48120', location: 'Austin, TX', remote: false,
    type: 'internship', posted: '2026-03-08', matchScore: 69,
    salary: '$40/hr', tags: ['Kubernetes', 'Docker', 'CI/CD'],
    summary: 'Help Cloudflare scale its global network that serves trillions of requests per day. You\'ll work on infrastructure, automation, and deployment pipelines.',
    requirements: ['Familiarity with Linux and shell scripting', 'Basic knowledge of containers (Docker/K8s)', 'Interest in distributed systems', 'Pursuing a CS or related degree'],
    responsibilities: ['Automate deployment pipelines', 'Monitor infrastructure health', 'Contribute to internal tooling', 'Debug production incidents'],
  },
];

function timeAgo(dateStr: string) {
  const days = Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return '1 day ago';
  if (days < 7) return `${days} days ago`;
  const weeks = Math.floor(days / 7);
  return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
}

export default function JobDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const job = JOBS.find((j) => j.id === Number(id));
  const from = location.state?.from || '/jobs';

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

  const scoreColor =
    job.matchScore >= 90 ? 'bg-green-100 text-green-700' :
    job.matchScore >= 75 ? 'bg-yellow-100 text-yellow-700' :
    'bg-gray-100 text-gray-500';

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

        <div className="bg-white rounded-3xl p-5 sm:p-6 lg:p-8 shadow-lg mb-4">
          <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5">
            <div
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center font-medium text-lg sm:text-xl flex-shrink-0"
              style={{ background: job.logoColor + '18', color: job.logoColor, border: `1px solid ${job.logoColor}35` }}
            >
              {job.logo}
            </div>

            <div className="flex-1 min-w-0">
              <h2 className="text-2xl sm:text-3xl text-gray-900 mb-1 leading-tight">
                {job.title}
              </h2>
              <p className="text-sm sm:text-base text-gray-500 mb-3">
                {job.company} · {job.location}
              </p>
              <div className="flex flex-wrap gap-2">
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${scoreColor}`}>
                  {job.matchScore}% match
                </span>
                <span className={`text-xs px-3 py-1 rounded-full ${job.type === 'internship' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                  {job.type === 'internship' ? 'Internship' : 'Full-time'}
                </span>
                {job.remote && (
                  <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-500">
                    Remote
                  </span>
                )}
                {job.tags.map((t) => (
                  <span key={t} className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-500">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="sm:text-right flex-shrink-0">
              <p className="text-lg sm:text-xl font-medium text-gray-800">
                {job.salary}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Posted {timeAgo(job.posted)}
              </p>
            </div>
          </div>

          <div className="flex gap-3 mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-gray-100">
            <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-full font-medium transition-colors text-sm sm:text-base">
              Apply now
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-3xl p-5 sm:p-6 lg:p-8 shadow-lg">
            <h3 className="text-xl sm:text-2xl text-blue-800 mb-4">Posting Summary</h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">{job.summary}</p>

            <h4 className="text-base sm:text-lg text-gray-800 mb-3">Responsibilities</h4>
            <ul className="space-y-2">
              {job.responsibilities.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-600 text-sm sm:text-base">
                  <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-5 sm:p-6 lg:p-8 shadow-lg">
            <h3 className="text-xl sm:text-2xl text-blue-800 mb-4">Requirements</h3>
            <ul className="space-y-3">
              {job.requirements.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-600 text-sm sm:text-base">
                  <span className="text-blue-500 mt-0.5 flex-shrink-0">→</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}