// import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../App';
import { Logo } from './Logo';
import { User } from 'lucide-react';

interface AuthHeaderProps {
  title: string;
}

export function AuthHeader({ title }: AuthHeaderProps) {
  const navigate = useNavigate();

  // testing a sticky header that transitions to a full bar when past a certain point
  const [scrolled, setScrolled] = useState(false);

  const { profilePic } = useAuth();

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 60);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white flex items-center justify-between shadow-lg transition-all duration-300 ${
        scrolled
          ? "rounded-none mx-0 px-10 py-4"       // full-width flat bar
          : "rounded-full mx-5 px-6 py-4"   // floating pill
      }`}
    >
      <div className="flex items-center gap-4">
        <Logo size="medium" />
        <h1 className="text-3xl font-semibold text-blue-900">{title}</h1>
      </div>
      <nav className="flex font-medium items-center gap-4">
        {/* executive change to have tab appear permanently */}
        {/* Dashboard tab/button on the header */}
        <button
          onClick={() => navigate('/dashboard')}
          className="hover:underline text-blue-800"
        >
          DASHBOARD
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
          {profilePic ? (
            <img
              src={profilePic}
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover border-2 border-white"
            />
          ) : (
            <User className="w-5 h-5 text-white" />
          )}
        </button>
      </nav>
    </header>
  );
}