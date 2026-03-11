import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { AuthHeader } from '../components/AuthHeader';

export default function DegreeCenterPage() {
  const navigate = useNavigate();
  const [progress] = useState(65); // Mock progress percentage

  return (
    <div className="min-h-screen bg-gray-50 pt-5 flex flex-col">
      <AuthHeader title="Degree Center" />

      <div className="p-8 space-y-8 flex-grow flex flex-col justify-center">
        {/* Progress Section */}
        <div className="text-center">
          <h2 className="text-5xl mb-6 text-blue-800">Your Current Progress</h2>
          <div className="max-w-3xl mx-auto mb-6">
            <div className="relative h-16 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-700 to-green-600 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          <button className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-full transition-colors"
            onClick={() => navigate('/course-plan')}
          >
            View Course Plan
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="mx-8 mb-8">
        <div className="bg-white rounded-3xl p-12 shadow-lg">
          <div className="grid grid-cols-3 gap-8">
            {/* Upload Transcript */}
            <div className="text-center border-r-2 border-gray-200 pr-8">
              <h3 className="text-4xl mb-8 text-gray-800">Upload Transcript</h3>
              <button 
                className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-full transition-colors"
                onClick={() => navigate('/transcript-upload')}
              >
                Upload Transcript
              </button>
            </div>

            {/* Explore Degrees */}
            <div className="text-center border-r-2 border-gray-200 px-8">
              <h3 className="text-4xl mb-8 text-gray-800">Explore All Degree Tracks</h3>
              <input
                type="text"
                placeholder="&lt;Search Bar for Degrees&gt;"
                className="w-full bg-white border-2 border-blue-700 rounded-full px-6 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Quiz */}
            <div className="text-center pl-8">
              <h3 className="text-4xl mb-8 text-gray-800">Quiz</h3>
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full transition-colors">
                Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}