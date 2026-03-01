import React from 'react';
import { useNavigate } from 'react-router';
import { AuthHeader } from '../components/AuthHeader';
import { Upload } from 'lucide-react';

export default function CareerCenterPage() {
  const navigate = useNavigate();

  const scrollToResumeSection = () => {
    const resumeSection = document.getElementById('resume-upload-section');
    if (resumeSection) {
      resumeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AuthHeader title="Career Center" />

      <div className="p-8 space-y-8">
        {/* Explore Careers Section */}
        <div className="text-center">
          <h2 className="text-5xl mb-6 text-green-700">Explore Careers</h2>
          <div className="max-w-3xl mx-auto">
            <input
              type="text"
              placeholder="<Career Search Bar>"
              className="w-full bg-white border-2 border-green-600 rounded-full px-6 py-4 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="bg-white rounded-3xl p-12 shadow-lg">
          <div className="grid grid-cols-3 gap-8">
            {/* Resume Analysis */}
            <div className="text-center border-r-2 border-gray-200 pr-8">
              <h3 className="text-4xl mb-8 text-gray-800">Resume Analysis</h3>
              <button
                onClick= {() => navigate('/resume-upload')}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full transition-colors"
              >
                Resume Analyzer
              </button>
            </div>

            {/* Job Listings */}
            <div className="text-center border-r-2 border-gray-200 px-8">
              <div className="bg-blue-800 rounded-3xl p-8 text-white">
                <h3 className="text-4xl mb-6">Job Listings</h3>
                <p className="text-sm">
                  &lt;list of current job listings. maybe try embeding a widget linkedin job
                  listings?&gt;
                </p>
              </div>
            </div>

            {/* Quiz */}
            <div className="text-center pl-8">
              <h3 className="text-4xl mb-8 text-gray-800">Quiz</h3>
              <button className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-full transition-colors">
                &lt;Quiz button&gt;
              </button>
            </div>
          </div>
        </div>

        {/* Career Upload Section */}
        <div id="resume-upload-section" className="bg-white rounded-3xl p-12 shadow-lg">
          <div className="flex items-center justify-center gap-4 mb-8">
            <Logo />
            <h2 className="text-5xl text-green-700">FutureFlow</h2>
          </div>
          <h3 className="text-4xl text-center mb-12 text-gray-800">Career</h3>
          <div className="grid grid-cols-2 gap-16 max-w-4xl mx-auto">
            {/* Have resume */}
            <div className="text-center">
              <p className="text-xl mb-6 text-gray-700">Have a resume? Drop it below!</p>
              <div className="bg-green-50 border-2 border-green-600 rounded-2xl p-12 flex items-center justify-center min-h-[200px] hover:bg-green-100 transition-colors cursor-pointer">
                <Upload className="w-24 h-24 text-green-700" />
              </div>
            </div>

            {/* No resume */}
            <div className="text-center">
              <p className="text-xl mb-6 text-gray-700">No resume? No problem!</p>
              <div className="bg-gray-100 border-2 border-gray-300 rounded-2xl p-12 flex items-center justify-center min-h-[200px]">
                <span className="text-gray-500">Placeholder</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center text-sm text-white">
      logo
    </div>
  );
}