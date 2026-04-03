// import React from 'react';
import { useNavigate } from 'react-router';
import { Logo } from './Logo';
import { User } from 'lucide-react';

interface AuthHeaderProps {
  title: string;
}

export function AuthHeader({ title }: AuthHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="bg-white rounded-full px-6 py-4 flex items-center justify-between mx-5 shadow-lg">
      <div className="flex items-center gap-4">
        <Logo size="medium" />
        <h1 className="text-3xl text-blue-900">{title}</h1>
      </div>
      <nav className="flex items-center gap-4">
        {/* executive change to have tab appear permanently */}
        {/* Dashboard tab/button on the header */}
        <button
          onClick={() => navigate('/dashboard')}
          className="hover:underline text-blue-800"
        >
          DASHBOARD
        </button>

        {/* Career Center tab on the header */}
        <button
          onClick={() => navigate('/career-center')}
          className="hover:underline text-blue-800"
        >
          CAREER CENTER
        </button>

        {/* Degree Center tab on the header */}
        <button
          onClick={() => navigate('/degree-center')}
          className="hover:underline text-blue-800"
        >
          DEGREE CENTER
        </button>

        {/* Job Center tab on the header */}
        <button
          onClick={() => navigate('/job-center')}
          className="hover:underline text-blue-800"
        >
          JOB CENTER
        </button>
        
        {/* About Us tab on the header */}
        <button onClick={() => navigate('/about')} className="hover:underline text-blue-800">
          ABOUT US
        </button>

        {/* Settings tab/button on the header */}
        <button
          onClick={() => navigate('/settings')}
          className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center hover:bg-green-700 transition-colors"
        >
          <User className="w-5 h-5 text-white" />
        </button>
      </nav>
    </header>
  );
}