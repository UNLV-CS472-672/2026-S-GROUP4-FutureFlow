import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { AuthHeader } from '../components/AuthHeader';
import { Upload } from 'lucide-react';

export default function DegreeCenterPage() {
  const navigate = useNavigate();
  const [progress] = useState(65); // Mock progress percentage

  return (
    <div className="min-h-screen bg-gray-50 pt-5">
      <AuthHeader title="Degree Center" />

      <div className="p-8 space-y-8">
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
          <button className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-full transition-colors">
            View Course Plan
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="bg-white rounded-3xl p-12 shadow-lg">
          <div className="grid grid-cols-3 gap-8">
            {/* Upload Transcript */}
            <div className="text-center border-r-2 border-gray-200 pr-8">
              <h3 className="text-4xl mb-8 text-gray-800">Upload Transcript</h3>
              <button className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-full transition-colors">
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

        {/* Education Upload Section */}
        <div className="bg-white rounded-3xl p-12 shadow-lg">
          <div className="flex items-center justify-center gap-4 mb-8">
            <Logo />
            <h2 className="text-5xl text-blue-800">FutureFlow</h2>
          </div>
          <h3 className="text-4xl text-center mb-12 text-gray-800">Education</h3>
          <div className="grid grid-cols-2 gap-16 max-w-4xl mx-auto">
            {/* Have transcript */}
            <div className="text-center">
              <p className="text-xl mb-6 text-gray-700">Have a transcript? Drop it below!</p>
              <div className="bg-blue-50 border-2 border-blue-700 rounded-2xl p-12 flex items-center justify-center min-h-[200px] hover:bg-blue-100 transition-colors cursor-pointer">
                <Upload className="w-24 h-24 text-blue-700" />
              </div>
            </div>

            {/* No transcript */}
            <div className="text-center">
              <p className="text-xl mb-6 text-gray-700">No transcript? No problem!</p>
              <div className="bg-gray-100 border-2 border-gray-300 rounded-2xl p-12 flex items-center justify-center min-h-[200px]">
                &lt;Placeholder&gt;
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
    <div className="w-16 h-16 rounded-full bg-blue-700 flex items-center justify-center text-sm text-white">
      logo
    </div>
  );
}