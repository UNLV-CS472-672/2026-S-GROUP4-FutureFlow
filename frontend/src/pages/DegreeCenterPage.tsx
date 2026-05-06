import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { AuthHeader } from '../components/AuthHeader';

type Course = {
  id: number;
  name: string;
  code: string;
};

const mockCourses: Course[] = [
  // { id: 1, name: 'Operating Systems', code: 'CS 370' },
  // { id: 2, name: 'Database Management Systems', code: 'CS 457' },
  // { id: 3, name: 'Machine Learning', code: 'CS 422' },
  // { id: 4, name: 'Cloud Computing', code: 'CS 442' },
];

function MaintenanceModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl p-16 max-w-2xl w-full flex flex-col items-center text-center gap-8 animate-[fadeInScale_0.2s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        <div className="w-32 h-32 rounded-3xl bg-yellow-50 border-2 border-yellow-200 flex items-center justify-center">
          <svg
            className="w-16 h-16 text-yellow-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>

        {/* Text */}
        <div className="space-y-3">
          <h3 className="text-4xl font-semibold text-gray-900">Under Maintenance</h3>
          <p className="text-lg text-gray-500 leading-relaxed">
            Document uploads are temporarily unavailable. We're working on it and will have this feature back shortly.
          </p>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="mt-2 w-full bg-blue-700 hover:bg-blue-800 text-white py-4 rounded-full font-medium text-lg transition-colors"
        >
          Got it
        </button>
      </div>

      <style>{`
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.95); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

export default function DegreeCenterPage() {
  const navigate = useNavigate();
  const [progress] = useState(0);
  const [courses] = useState<Course[]>(mockCourses);
  const [showMaintenance, setShowMaintenance] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="min-h-screen bg-[#eeede9] pt-3 sm:pt-5 flex flex-col">
      <AuthHeader title="Degree Center" />

      {showMaintenance && (
        <MaintenanceModal onClose={() => setShowMaintenance(false)} />
      )}

      <div className="px-3 py-4 sm:px-5 sm:py-6 lg:p-8 space-y-6 sm:space-y-8 flex-grow flex flex-col">
        {/* Progress Section */}
        <div className="text-center">
          <h2 className="px-2 py-4 sm:p-6 lg:p-8 text-3xl sm:text-4xl lg:text-5xl text-blue-800">
            Current Degree Progress
          </h2>

          <div className="max-w-3xl mx-auto mb-5 sm:mb-6">
            <div className="relative flex items-center bg-gray-200 border-2 border-gray-300 rounded-full px-2 sm:px-3 py-2 h-[48px] sm:h-[56px] overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-700 to-green-600 rounded-full transition-all flex items-center justify-end pr-4 sm:pr-5"
                style={{ width: `${progress}%` }}
              >
                <span className="text-white text-xs sm:text-sm font-bold">
                  {progress}%
                </span>
              </div>
            </div>
          </div>

          <button
            className="bg-blue-700 hover:bg-blue-800 text-white px-6 sm:px-8 py-3 rounded-full transition-colors font-medium text-sm sm:text-base"
            onClick={() => navigate('/course-plan')}
          >
            View Course Plan
          </button>
        </div>

        {/* Main Information */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-5">
          {/* LEFT */}
          <div className="xl:col-span-2 bg-white rounded-3xl p-4 sm:p-6 shadow-lg border border-gray-100 flex flex-col">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
              Current Classes
            </h3>

            <div className="bg-gray-100 rounded-2xl p-3 border border-gray-200 flex-1 flex flex-col">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 overflow-y-auto flex-1">
                {courses.map(course => (
                  <div
                    key={course.id}
                    className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer"
                  >
                    <p className="text-sm sm:text-base font-semibold text-blue-600">
                      {course.code}
                    </p>
                    <p className="text-base sm:text-lg font-semibold text-gray-800 leading-tight mt-1">
                      {course.name}
                    </p>
                    <span className="text-xs text-gray-500 mt-2 block">
                      3 Credits • In Progress
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="xl:col-span-1 flex flex-col gap-4">
            {/* Explore Degree Tracks */}
            <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-lg border border-gray-100 flex flex-col items-center justify-center">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 text-center">
                Explore Degree Tracks
              </h3>

              <button
                onClick={() => navigate('/explore-degrees')}
                className="flex flex-col items-center justify-center bg-blue-50 hover:bg-blue-100 border-2 border-dashed border-blue-200 hover:border-blue-400 rounded-2xl p-6 sm:p-8 transition-all group w-full"
              >
                <svg
                  className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 group-hover:text-blue-600 group-hover:scale-110 transition-all"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="8" strokeWidth={2} />
                  <path strokeLinecap="round" strokeWidth={2} d="M21 21l-4.35-4.35" />
                </svg>
              </button>
            </div>

            {/* Upload Transcript */}
            <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-lg border border-gray-100 flex flex-col items-center justify-center">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 text-center">
                Upload Transcript
              </h3>

              <button
                onClick={() => setShowMaintenance(true)}
                className="flex flex-col items-center justify-center bg-blue-50 hover:bg-blue-100 border-2 border-dashed border-blue-200 hover:border-blue-400 rounded-2xl p-6 sm:p-8 transition-all group w-full"
              >
                <svg
                  className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 group-hover:text-blue-600 group-hover:scale-110 transition-all"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 0L8 8m4-4l4 4"
                  />
                </svg>
              </button>

              <input ref={fileInputRef} type="file" className="hidden" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}