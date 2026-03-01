import React from 'react';
import { useNavigate } from 'react-router';
import { Logo } from '../components/Logo';

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <Logo size="medium" />
            <h1 className="text-5xl text-blue-900">FutureFlow</h1>
          </div>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-full transition-colors"
          >
            Back to Home
          </button>
        </div>

        <div className="bg-white border-2 border-blue-700 rounded-3xl p-12 shadow-lg">
          <h2 className="text-4xl mb-6 text-blue-800">About Us</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>
              Welcome to FutureFlow — not just a platform, but a paradigm shift in human potential.
            </p>
            <p>
              We are the definitive nexus where ambition, intelligence, and opportunity converge in dynamic, transformative synergy. FutureFlow doesn’t simply support career and educational advancement — it re-engineers the very architecture of how futures are imagined, designed, and realized.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}