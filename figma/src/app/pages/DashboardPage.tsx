import React from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../App';
import { AuthHeader } from '../components/AuthHeader';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const progress = 45; // Mock progress percentage

  return (
    <div className="min-h-screen bg-gray-50">
      <AuthHeader title="FutureFlow Hub" showYourDocuments={true} />

      <div className="grid grid-cols-3 gap-8 p-8">
        {/* Left Column - Centers */}
        <div className="space-y-8">
          {/* Degree Center */}
          <div className="bg-white border-2 border-blue-700 rounded-3xl p-8 shadow-lg">
            <h2 className="text-3xl mb-4 text-blue-800">Degree Center</h2>
            <p className="text-center mb-6 text-gray-700">
              "Small explanation/purpose of this box/list of bullet points."
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => navigate('/degree-center')}
                className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-full transition-colors"
              >
                Degree Center
              </button>
            </div>
          </div>

          {/* Career Center */}
          <div className="bg-white border-2 border-green-600 rounded-3xl p-8 shadow-lg">
            <h2 className="text-3xl mb-4 text-green-700">Career Center</h2>
            <p className="text-center mb-6 text-gray-700">
              "Small explanation/purpose of this box/list of bullet points."
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => navigate('/career-center')}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full transition-colors"
              >
                Career Center
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Welcome and Progress */}
        <div className="col-span-2 bg-white rounded-3xl p-12 shadow-lg">
          <h2 className="text-6xl mb-8 text-blue-900">
            Welcome back,
            <br />
            {user?.firstName}!
          </h2>

          {/* Daily Recommendation */}
          <div className="mb-12">
            <h3 className="text-4xl mb-4 text-gray-800">Daily Recommendation</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-3xl p-8 text-center">
              &lt;show a career/some sort of listing&gt;
            </div>
          </div>

          {/* Degree Progress */}
          <div>
            <h3 className="text-4xl mb-4 text-gray-800">Degree Progress</h3>
            <div className="relative h-16 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-700 to-green-600 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}