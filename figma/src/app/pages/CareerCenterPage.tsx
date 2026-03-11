import React, { useState } from 'react';
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
    <div className="min-h-screen bg-gray-50 pt-5 flex flex-col">
      <AuthHeader title="Career Center" />

      <div className="p-8 space-y-8 flex-grow flex flex-col justify-center">
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
      </div>

      {/* Main Content Grid */}
      <div className="mx-8 mb-8">
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
              <button 
                onClick = {() => navigate('/career-quiz')}
                className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-full transition-colors"
              >
                Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}