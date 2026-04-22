// import React from 'react';
import { NonAuthHeader } from '../components/NonAuthHeader';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-3 sm:pt-5">
      <NonAuthHeader title="Future Flow" />

      <div className="max-w-5xl mx-auto px-4 py-4 mt-3 sm:px-6 sm:py-5 sm:mt-5 lg:px-8">
        <h2 className="text-3xl sm:text-4xl mb-4 text-blue-800 text-center">
          Meet the Team
        </h2>

        <div className="w-full h-[220px] sm:h-[300px] lg:h-[600px] rounded-3xl overflow-hidden shadow-lg mb-2">
          <img
            src="/images/team-photo.jpg"
            alt="FutureFlow development team"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="mb-6 text-center px-2 ">
          <p className="text-sm sm:text-base text-blue-800">
            FutureFlow Developers
          </p>
          <p className="text-sm sm:text-base text-gray-700">
            Top Row(left to right): Jason Thompson, Isaiah Burke, Reon Ozaki, Kwasi Clouden, Jonathan Davis
          </p>
          <p className="text-sm sm:text-base text-gray-700">
            Bottom Row(left to right): Deigo Ocegueda, Selei Cho, Jada Lok, Sean Tran
          </p>
          <p className="text-sm sm:text-base text-gray-700">
            Not Pictured: Damian Beller
          </p>
        </div>

        <div className="bg-white border-2 border-blue-700 rounded-3xl p-5 sm:p-8 lg:p-10 shadow-lg">
          <h2 className="text-3xl sm:text-4xl mb-4 sm:mb-6 text-blue-800">
            About Us
          </h2>

          <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed">
            <p>
              Welcome to FutureFlow — not just a platform, but a paradigm shift in human potential.
            </p>
            <p>
              We are the definitive nexus where ambition, intelligence, and opportunity converge in dynamic, transformative synergy. FutureFlow doesn't simply support career and educational advancement — it re-engineers the very architecture of how futures are imagined, designed, and realized.
            </p>
            <p>
              This isn't just career navigation. This is future command. Get it right.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}