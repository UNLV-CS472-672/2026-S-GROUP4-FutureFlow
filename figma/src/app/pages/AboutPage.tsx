import React from 'react';
import { useNavigate } from 'react-router';
import { Logo } from '../components/Logo';

export default function AboutPage() {
  const navigate = useNavigate();

  {/*
    This section includes the header and Go Back button.
  */}
  
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <Logo size="medium" />
            <h1 className="text-5xl text-blue-900">FutureFlow</h1>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-full transition-colors"
          >
            Go Back
          </button>
        </div>

  {/*
    This section includes the team photo image and the About Us text.
    SC - 02/28/26: The comment below is a basic textscript code we can use when we actually have an image to upload to FutureFlow.
  */}
        
        {/* TextScript file when we want real image */}
        {/*<img 
            src="/images/your-image.jpg" 
            alt="Description"
            className="w-full h-full object-cover rounded-3xl"
            />
        */}

        <h2 className = "text-4xl mb-4 text-blue-800 text-center">
          Meet the Team
        </h2>
        <div className="w-full h-125 bg-gray-200 rounded-3xl flex items-center justify-center shadow-lg mb-2">
          <span className="text-gray-500"> Team Photo Image Goes Here </span>
        </div>
        <div className = "mb-6 text-center">
          <p>
          Names (left to right): [INSERT NAMES HERE]
          </p>
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
            <p>
            This isn't just career navigation. This is future command. Get it right.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}