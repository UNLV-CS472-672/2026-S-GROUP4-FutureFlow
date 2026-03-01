import React from 'react';
import { useNavigate } from 'react-router';
import { Logo } from '../components/Logo';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-blue-50 rounded-3xl mx-5 mt-5 px-8 py-6">
        {/* Header */}
        <header className="bg-white rounded-full px-6 py-4 flex items-center justify-between mb-12 shadow-lg text-md">
          <Logo size="medium" />
          <p className="text-xl mb-5 text-blue-800 flex gap-8 self-end mb-2">
            "Insert SHORT slogan right here!"</p>
          <nav className="flex gap-4">
            <button
              onClick={() => navigate('/career-center')}
              className="hover:underline text-blue-800"
            >
              CAREER CENTER
            </button>
            <button
              onClick={() => navigate('/degree-center')}
              className="hover:underline text-blue-800"
            >
              DEGREE CENTER
            </button>
            <button
              onClick={() => navigate('/about')}
              className="hover:underline text-blue-800"
            >
              ABOUT US
            </button>
            <button
              onClick={() => navigate('/login')}
              className="hover:underline text-blue-800"
            >
              LOGIN/SIGN-UP
            </button>
          </nav>
        </header>

        {/* Hero Content */}
        <div className="text-center py-12">
          <h1 className="text-8xl mb-4 text-blue-900">FutureFlow</h1>
          <button
            onClick={() => navigate('/signup')}
            className="bg-blue-700 hover:bg-blue-800 text-white px-12 py-4 rounded-full text-lg transition-colors"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Career and Degree Search Sections */}
      <div className="grid grid-cols-2 gap-8 px-5 py-8">
        {/* Career Search */}
        <div className="bg-white border-2 border-green-600 rounded-3xl p-12 shadow-lg">
          <h2 className="text-5xl mb-4 text-green-700">Career Search</h2>
          <p className="text-lg mb-8 text-center text-gray-700">
            "Small explanation/purpose of this box/list of bullet points."
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => navigate('/career-center')}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full transition-colors"
            >
              Explore Careers
            </button>
          </div>
        </div>

        {/* Degree Search */}
        <div className="bg-white border-2 border-blue-700 rounded-3xl p-12 shadow-lg">
          <h2 className="text-5xl mb-4 text-blue-800">Degree Search</h2>
          <p className="text-lg mb-8 text-center text-gray-700">
            "Small explanation/purpose of this box/list of bullet points."
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => navigate('/degree-center')}
              className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-full transition-colors"
            >
              Explore Degrees
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}