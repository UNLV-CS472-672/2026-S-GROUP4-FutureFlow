import { useNavigate, useParams } from 'react-router-dom';
import { AuthHeader } from '../components/AuthHeader';

// In a real app this would be a fetch call: fetch(`/api/degrees/${id}`)
const DEGREES = [
  {
    id: 1,
    title: 'Bachelor of Science in Computer Science',
    university: 'University of Nevada, Las Vegas',
    logo: 'E',
    logoColor: '#4285F4',
    location: 'Las Vegas, NV',
    college: 'College of Engineering',
    credits: 120,
    summary:
      'The Bachelor of Science in Computer Science degree program is a mathematically rigorous, scientifically oriented curriculum that prepares students to become proficient in all fundamental areas and techniques of computer science. Students learn how to develop efficient algorithms to solve problems in a variety of application areas and implement their solutions using appropriate programming languages and computer systems. This degree program will also prepare students to pursue research opportunities and postgraduate studies in Computer Science.',
  },
  {
    id: 2,
    title: 'Bachelor of Science in Business Administration, Finance',
    university: 'University of Nevada, Las Vegas',
    logo: 'E',
    logoColor: '#4285F4',
    location: 'Las Vegas, NV',
    college: 'Lee Business School',
    credits: 120,
    summary:
      'The undergraduate program in finance prepares students to understand the financial implications inherent in virtually all business decisions. This is obviously true for a large corporation, a major bank, or a casino and hotel company. However, it is equally true for the owner of a small business with 10 employees, for a city manager with 200 employees, or for the business director of a nonprofit organization. The finance curriculum allows students to concentrate their studies on financial management, investments, or financial services.',
  },
];

export default function DegreeDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const degree = DEGREES.find((d) => d.id === Number(id));

  if (!degree) {
    return (
      <div className="min-h-screen bg-gray-50 pt-5">
        <AuthHeader title="Degree Details" />

        <div className="p-8 text-center text-gray-500 text-lg mt-16">
          Degree not found.{' '}
          <button
            onClick={() => navigate('/explore-degrees')}
            className="text-green-600 underline"
          >
            Back to listings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-5">
      <AuthHeader title="Degree Details" />

      <div className="p-8 max-w-4xl mx-auto">
        {/* Back link */}
        <button
          onClick={() => navigate('/explore-degrees')}
          className="text-sm text-gray-400 hover:text-gray-600 mb-6 flex items-center gap-1 transition-colors"
        >
          ← Back to results
        </button>

        {/* Header card */}
        <div className="bg-white rounded-3xl p-8 shadow-lg mb-4">
          <div className="flex items-start gap-5">
            {/* Logo */}
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center font-medium text-xl flex-shrink-0"
              style={{
                background: degree.logoColor + '18',
                color: degree.logoColor,
                border: `1px solid ${degree.logoColor}35`,
              }}
            >
              {degree.logo}
            </div>

            {/* Main degree information */}
            <div className="flex-1">
              <h2 className="text-3xl text-gray-900 mb-1">
                {degree.title}
              </h2>

              <p className="text-gray-500 mb-3">
                {degree.university} · {degree.location}
              </p>

              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                  {degree.college}
                </span>

                {/* Credits badge */}
                <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700">
                  {degree.credits} Credits
                </span>
              </div>

              {/* Extra clarity */}
              <p className="text-sm text-gray-500 mt-2">
                Total Required Credits:{' '}
                <span className="font-medium text-gray-700">
                  {degree.credits}
                </span>
              </p>
            </div>
          </div>

          {/* Action button */}
          <div className="flex gap-3 mt-6 pt-6 border-t border-gray-100">
            <button
              onClick={() => navigate(`/degrees/${degree.id}/plan`)}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-full font-medium transition-colors"
            >
              View Degree Plan
            </button>
          </div>
        </div>

        {/* Degree details */}
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <h3 className="text-2xl text-blue-800 mb-4">
            Degree Summary
          </h3>

          <p className="text-gray-600 leading-relaxed">
            {degree.summary}
          </p>
        </div>
      </div>
    </div>
  );
}