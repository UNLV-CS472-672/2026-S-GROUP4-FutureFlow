import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Logo } from '../components/Logo';
import { useAuth } from '../App';
import { Menu, X } from 'lucide-react';
import '../index.css';

export default function LandingPage() {
  const navigate = useNavigate();
  const { loginWithCode } = useAuth();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      loginWithCode(code).then(() => {
        navigate('/dashboard');
      });
    }
  }, [loginWithCode, navigate]);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 60);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const login = () => {
    const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID;
    const domain = import.meta.env.VITE_COGNITO_DOMAIN;
    const redirectUri = import.meta.env.VITE_APP_URL;
    const scope = 'email openid profile';

    window.location.href =
      `${domain}/login?client_id=${clientId}&response_type=code&scope=${scope}&redirect_uri=${redirectUri}`;
  };

  const navButtonClass =
    'hover:underline text-blue-800 text-sm lg:text-base px-2 py-1 whitespace-nowrap';

  return (
    <div className="min-h-screen">
      {/* HEADER */}
      <header
        className={`sticky top-0 z-50 bg-white shadow-lg transition-all duration-300 ${
          scrolled
            ? 'rounded-none mx-0 px-4 py-3 sm:px-5 sm:py-4 lg:px-10'
            : 'rounded-3xl lg:rounded-full mx-3 mt-3 px-4 py-3 sm:mx-5 sm:px-5 sm:py-4 lg:px-6'
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          {/* Left Side */}
          <div className="flex items-center gap-3 min-w-0">
            <Logo size="medium" />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-4 font-medium">
            <button
              onClick={() => navigate('/about')}
              className={navButtonClass}
            >
              ABOUT US
            </button>

            <button
              onClick={login}
              className="bg-blue-800 text-white px-5 py-2 rounded-full text-base hover:bg-blue-900 transition-colors whitespace-nowrap"
            >
              LOGIN / SIGN-UP
            </button>
          </nav>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            className="lg:hidden w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-blue-800 hover:bg-gray-50 transition-colors shrink-0"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <nav className="lg:hidden mt-4 pt-4 border-t border-gray-200 flex flex-col gap-2">
            <button
              onClick={() => {
                navigate('/about');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-3 rounded-xl text-blue-800 hover:bg-blue-50 transition-colors"
            >
              About Us
            </button>

            <button
              onClick={() => {
                login();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-3 rounded-xl text-blue-800 hover:bg-blue-50 transition-colors"
            >
              Login / Sign-Up
            </button>
          </nav>
        )}
      </header>

      {/* MAIN SECTION */}
      <div className="relative min-h-screen overflow-hidden">
        {/* Wave Background */}
        <div className="wave"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>

        <div className="relative z-20">
          {/* HERO */}
          <section className="text-center pt-20 sm:pt-24 md:pt-28 pb-32 px-4">
            <h1 className="text-[#00cac5] text-5xl sm:text-7xl md:text-8xl mb-4 leading-tight">
              FutureFlow
            </h1>

            <h2 className="text-[#00cac5] text-base sm:text-lg md:text-xl mb-8 mx-auto leading-relaxed max-w-xl">
              Don't just ride the waves. Let your Future Flow.
            </h2>

            <button
              onClick={login}
              style={{
                background:
                  'linear-gradient(to right, #038eab, #03b6be)',
                color: 'white',
              }}
              className="px-8 py-3 sm:px-10 sm:py-4 md:px-12
                         rounded-full font-semibold text-base sm:text-lg tracking-wide
                         shadow-lg transition-all duration-300
                         hover:-translate-y-1 hover:scale-[1.02] active:scale-95"
            >
              Start Your Journey →
            </button>
          </section>

          {/* CARDS */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 px-4 sm:px-8 md:px-12 pb-16 md:pb-20">
            {/* Job Search */}
            <div
              onClick={login}
              className="cursor-pointer bg-white/85 backdrop-blur-lg
                         border border-white/20 rounded-3xl
                         p-6 sm:p-8 md:p-12
                         shadow-md hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)]
                         hover:-translate-y-2 hover:scale-[1.02]
                         transition-all duration-300
                         flex flex-col items-center justify-between h-full"
            >
              <h2 className="text-[#065F46] font-semibold text-3xl sm:text-4xl md:text-5xl mb-4 text-center">
                Job Search
              </h2>

              <p className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 text-center text-gray-600 leading-relaxed">
                See opportunities, salaries, and real-world paths.
              </p>

              <span className="text-green-600 text-2xl sm:text-3xl">
                Explore →
              </span>
            </div>

            {/* Degree Search */}
            <div
              onClick={login}
              className="cursor-pointer bg-white/85 backdrop-blur-lg
                         border border-white/20 rounded-3xl
                         p-6 sm:p-8 md:p-12
                         shadow-md hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)]
                         hover:-translate-y-2 hover:scale-[1.02]
                         transition-all duration-300
                         flex flex-col items-center justify-between h-full"
            >
              <h2 className="text-[#1E3A8A] font-semibold text-3xl sm:text-4xl md:text-5xl mb-4 text-center">
                Degree Search
              </h2>

              <p className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 text-center text-gray-600 leading-relaxed">
                Find programs that lead to real opportunities.
              </p>

              <span className="text-blue-700 text-2xl sm:text-3xl">
                Explore →
              </span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}