// import React from 'react';
import { useNavigate } from 'react-router';
import { AuthHeader } from '../components/AuthHeader';
import { BookOpen, Calendar, CheckCircle } from 'lucide-react';

export default function CoursePlanPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pt-3 sm:pt-5">
      <AuthHeader title="Course Plan" />

      <div className="px-3 py-4 sm:px-5 sm:py-6 lg:p-8 space-y-6 sm:space-y-8">
        {/* Page Header */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-3 sm:mb-4 text-blue-800">
            Your Course Plan
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 px-2">
            Plan your academic journey to success
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-3xl p-5 sm:p-8 lg:p-12 shadow-lg max-w-6xl mx-auto">
          <div className="text-center py-6 sm:py-10 lg:py-12">
            <div className="flex justify-center mb-5 sm:mb-6">
              <BookOpen className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-blue-700" />
            </div>

            <h3 className="text-2xl sm:text-3xl mb-3 sm:mb-4 text-gray-800">
              Course Plan Coming Soon
            </h3>

            <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-2xl mx-auto px-2">
              This feature will help you visualize and plan your academic path. You'll be able to see:
            </p>

            {/* Feature List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto mb-8 sm:mb-12">
              <div className="bg-blue-50 rounded-2xl p-5 sm:p-6 border-2 border-blue-200">
                <div className="flex justify-center mb-4">
                  <Calendar className="w-10 h-10 sm:w-12 sm:h-12 text-blue-700" />
                </div>
                <h4 className="text-lg sm:text-xl mb-2 text-blue-800">
                  Semester Planning
                </h4>
                <p className="text-sm sm:text-base text-gray-700">
                  Organize courses by semester and track deadlines
                </p>
              </div>

              <div className="bg-green-50 rounded-2xl p-5 sm:p-6 border-2 border-green-200">
                <div className="flex justify-center mb-4">
                  <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-green-600" />
                </div>
                <h4 className="text-lg sm:text-xl mb-2 text-green-700">
                  Progress Tracking
                </h4>
                <p className="text-sm sm:text-base text-gray-700">
                  Monitor completed courses and requirements
                </p>
              </div>

              <div className="bg-purple-50 rounded-2xl p-5 sm:p-6 border-2 border-purple-200">
                <div className="flex justify-center mb-4">
                  <BookOpen className="w-10 h-10 sm:w-12 sm:h-12 text-purple-600" />
                </div>
                <h4 className="text-lg sm:text-xl mb-2 text-purple-700">
                  Course Recommendations
                </h4>
                <p className="text-sm sm:text-base text-gray-700">
                  Get suggested courses based on your goals
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <button
                onClick={() => navigate('/degree-center')}
                className="bg-blue-700 hover:bg-blue-800 text-white px-6 sm:px-8 py-3 rounded-full transition-colors w-full sm:w-auto"
              >
                Back to Degree Center
              </button>

              <button
                onClick={() => navigate('/dashboard')}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 sm:px-8 py-3 rounded-full transition-colors w-full sm:w-auto"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}