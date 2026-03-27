import React from 'react';
import { useNavigate } from 'react-router';
import { AuthHeader } from '../components/AuthHeader';
import { BookOpen, Calendar, CheckCircle } from 'lucide-react';

export default function CoursePlanPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pt-5">
      <AuthHeader title="Course Plan" />

      <div className="p-8 space-y-8">
        {/* Page Header */}
        <div className="text-center">
          <h2 className="text-5xl mb-4 text-blue-800">Your Course Plan</h2>
          <p className="text-xl text-gray-600">Plan your academic journey to success</p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-3xl p-12 shadow-lg max-w-6xl mx-auto">
          
          {/* Placeholder Content */}
          <div className="text-center py-12">
            <div className="flex justify-center mb-6">
              <BookOpen className="w-24 h-24 text-blue-700" />
            </div>
            <h3 className="text-3xl mb-4 text-gray-800">Course Plan Coming Soon</h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              This feature will help you visualize and plan your academic path. You'll be able to see:
            </p>
            
            {/* Feature List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
              <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
                <div className="flex justify-center mb-4">
                  <Calendar className="w-12 h-12 text-blue-700" />
                </div>
                <h4 className="text-xl mb-2 text-blue-800">Semester Planning</h4>
                <p className="text-gray-700">Organize courses by semester and track deadlines</p>
              </div>

              <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-200">
                <div className="flex justify-center mb-4">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <h4 className="text-xl mb-2 text-green-700">Progress Tracking</h4>
                <p className="text-gray-700">Monitor completed courses and requirements</p>
              </div>

              <div className="bg-purple-50 rounded-2xl p-6 border-2 border-purple-200">
                <div className="flex justify-center mb-4">
                  <BookOpen className="w-12 h-12 text-purple-600" />
                </div>
                <h4 className="text-xl mb-2 text-purple-700">Course Recommendations</h4>
                <p className="text-gray-700">Get suggested courses based on your goals</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => navigate('/degree-center')}
                className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-full transition-colors"
              >
                Back to Degree Center
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-8 py-3 rounded-full transition-colors"
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
