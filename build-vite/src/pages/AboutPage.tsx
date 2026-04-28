// import React from 'react';
import { NonAuthHeader } from '../components/NonAuthHeader';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-3 sm:pt-5">
      <NonAuthHeader title="Future Flow" />

      <div className="max-w-5xl mx-auto px-4 py-4 mt-3 sm:px-6 sm:py-5 sm:mt-5 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-5 text-blue-800 text-center">
          Meet the Team
        </h2>

        <div className="w-full aspect-[16/9] sm:aspect-[16/10] lg:aspect-[5/3] rounded-3xl overflow-hidden shadow-xl mb-4 border border-gray-200">
          <img
            src="/images/team-photo.jpg"
            alt="FutureFlow development team"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="mb-8 text-center px-2 space-y-2">
          <p className="text-base sm:text-lg font-semibold text-blue-800">
            FutureFlow Developers
          </p>

          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            <span className="font-semibold text-gray-900">
              Top Row (left to right):
            </span>{' '}
            Jason Thompson, Isaiah Burke, Reon Ozaki, Kwasi Clouden, Jonathan
            Davis
          </p>

          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            <span className="font-semibold text-gray-900">
              Bottom Row (left to right):
            </span>{' '}
            Deigo Ocegueda, Selei Cho, Jada Lok, Sean Tran
          </p>

          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            <span className="font-semibold text-gray-900">
              Not Pictured:
            </span>{' '}
            Damian Beller
          </p>
        </div>

        <div className="bg-white border-2 border-blue-700 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6 text-blue-800">
            About Us
          </h2>

          <div className="space-y-6 text-base sm:text-lg text-gray-700 leading-8">
            <p>
              We created{' '}
              <span className="font-semibold text-blue-800">FutureFlow</span>{' '}
              with one clear purpose: to make the job search process less
              stressful, more organized, and more empowering for students,
              graduates, and early professionals. Searching for a job can often
              feel overwhelming—endless applications, unclear qualifications,
              and uncertainty about where to start or how to stand out.
            </p>

            <p>
              We saw how many capable individuals struggle not because they lack
              talent, but because they lack the right guidance, tools, and
              direction. As a team, we wanted to build a platform that helps
              people navigate that journey with confidence.
            </p>

            <p>
              <span className="font-semibold text-blue-800">FutureFlow</span>{' '}
              was designed to support users through every stage of the hiring
              process—from discovering opportunities and identifying skill gaps
              to strengthening resumes and preparing for the next step in their
              careers.
            </p>

            <p>
              Our mission is rooted in empathy, innovation, and opportunity. We
              believe job searching should feel like progress, not frustration.
              That’s why we built{' '}
              <span className="font-semibold text-blue-800">FutureFlow</span>—to
              help turn uncertainty into direction, and ambition into real
              career opportunities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}