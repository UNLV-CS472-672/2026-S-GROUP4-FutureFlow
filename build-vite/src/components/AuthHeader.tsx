import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../App';
import { Logo } from './Logo';
import { User, Menu, X } from 'lucide-react';

interface AuthHeaderProps {
  title: string;
}

export function AuthHeader({ title }: AuthHeaderProps) {
  const navigate = useNavigate();
  const { profilePic } = useAuth();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 60);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const navButtonClass =
    'hover:underline text-blue-800 text-sm lg:text-base px-2 py-1 whitespace-nowrap';

  const mobileNavButtonClass =
    'w-full text-left px-4 py-3 rounded-xl text-blue-800 hover:bg-blue-50 transition-colors';

  return (
    <header
      className={`sticky top-0 z-50 bg-white shadow-lg transition-all duration-300 ${
        scrolled
          ? 'rounded-none mx-0 px-4 py-3 sm:px-5 sm:py-4 lg:px-10'
          : 'rounded-3xl lg:rounded-full mx-3 mt-3 px-4 py-3 sm:mx-5 sm:px-5 sm:py-4 lg:px-6'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        {/* Left side */}
        <div className="flex items-center gap-3 min-w-0">
          <Logo size="medium" />
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-blue-900 truncate">
            {title}
          </h1>
        </div>

        {/* Desktop nav */}
        <nav className="hidden lg:flex font-medium items-center gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className={navButtonClass}
          >
            DASHBOARD
          </button>

          {/* <button
            onClick={() => navigate('/career-center')}
            className={navButtonClass}
          >
            CAREER CENTER
          </button> */}

          <button
            onClick={() => navigate('/degree-center')}
            className={navButtonClass}
          >
            DEGREE CENTER
          </button>

          <button
            onClick={() => navigate('/job-center')}
            className={navButtonClass}
          >
            JOB CENTER
          </button>

          <button
            onClick={() => navigate('/about')}
            className={navButtonClass}
          >
            ABOUT US
          </button>

          <button
            onClick={() => navigate('/settings')}
            className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center hover:bg-green-700 transition-colors shrink-0"
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

        {/* Mobile controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => navigate('/settings')}
            className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center hover:bg-green-700 transition-colors shrink-0"
          >
            {profilePic ? (
              <img
                src={profilePic}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-white"
              />
            ) : (
              <User className="w-4 h-4 text-white" />
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-blue-800 hover:bg-gray-50 transition-colors shrink-0"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <nav className="lg:hidden mt-4 pt-4 border-t border-gray-200 flex flex-col gap-2">
          <button
            onClick={() => handleNavigate('/dashboard')}
            className={mobileNavButtonClass}
          >
            Dashboard
          </button>

          <button
            onClick={() => handleNavigate('/degree-center')}
            className={mobileNavButtonClass}
          >
            Degree Center
          </button>

          <button
            onClick={() => handleNavigate('/job-center')}
            className={mobileNavButtonClass}
          >
            Job Center
          </button>

          <button
            onClick={() => handleNavigate('/about')}
            className={mobileNavButtonClass}
          >
            About Us
          </button>

          <button
            onClick={() => handleNavigate('/settings')}
            className={mobileNavButtonClass}
          >
            Settings
          </button>
        </nav>
      )}
    </header>
  );
}