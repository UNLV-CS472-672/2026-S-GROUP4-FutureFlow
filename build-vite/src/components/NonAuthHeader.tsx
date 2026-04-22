// import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Logo } from './Logo';

interface AuthHeaderProps {
  title: string;
}

export function NonAuthHeader({ title }: AuthHeaderProps) {
  const navigate = useNavigate();

  // testing a sticky header that transitions to a full bar when past a certain point
  const [scrolled, setScrolled] = useState(false);

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
          : "rounded-full mx-5 px-6 py-4 mt-5"   // floating pill
      }`}
    >
      <div className="flex items-center gap-4">
        <Logo size="medium" />
        <h1 className="text-3xl text-blue-900">{title}</h1>
      </div>
      <nav className="flex items-center gap-4">

        {/* Blue button to return to previous page */}
        {/* works for both auth and non auth users */}
        <nav className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-full transition-colors"
          >
            Go Back
          </button>
        </nav>
      </nav>
    </header>
  );
}