import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Logo } from '../components/Logo';
import { useAuth } from '../App';
import { Menu, X, Briefcase, GraduationCap } from 'lucide-react';
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
    <div className="min-h-screen bg-white">
      <header
        className={`sticky top-0 z-50 bg-white shadow-lg transition-all duration-300 ${
          scrolled
            ? 'rounded-none mx-0 px-4 py-3 sm:px-5 sm:py-4 lg:px-10'
            : 'rounded-3xl lg:rounded-full mx-3 mt-3 px-4 py-3 sm:mx-5 sm:px-5 sm:py-4 lg:px-6'
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Logo size="medium" />
          </div>

          <nav className="hidden lg:flex items-center gap-4 font-medium">
            <button onClick={() => navigate('/about')} className={navButtonClass}>
              ABOUT US
            </button>

            <button
              onClick={login}
              className="bg-blue-800 text-white px-5 py-2 rounded-full text-base hover:bg-blue-900 transition-colors whitespace-nowrap"
            >
              LOGIN / SIGN-UP
            </button>
          </nav>

          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            className="lg:hidden w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-blue-800 hover:bg-gray-50 transition-colors shrink-0"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

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

      <div className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="wave"></div>
          <div className="wave wave2"></div>
          <div className="wave wave3"></div>
        </div>

        <div className="relative z-20">
          <section className="text-center pt-16 sm:pt-24 md:pt-28 pb-20 sm:pb-28 md:pb-32 px-4">
            <h1 className="text-[#00cac5] text-5xl sm:text-7xl md:text-8xl mb-4 leading-tight">
              FutureFlow
            </h1>

            <h2 className="text-[#00cac5] text-base sm:text-lg md:text-xl mb-8 mx-auto leading-relaxed max-w-xl">
              Where the flow of future stability becomes clearer.
            </h2>

            <button
              onClick={login}
              style={{
                background: 'linear-gradient(to right, #038eab, #03b6be)',
                color: 'white',
              }}
              className="px-8 py-3 sm:px-10 sm:py-4 md:px-12 rounded-full font-semibold text-base sm:text-lg tracking-wide shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] active:scale-95"
            >
              Start Your Journey →
            </button>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 px-4 sm:px-8 md:px-12 pb-16 md:pb-20">
            <div
              onClick={login}
              className="group cursor-pointer bg-white/85 backdrop-blur-lg border border-white/20 rounded-3xl p-6 sm:p-8 md:p-12 shadow-md hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 flex flex-col items-center justify-between min-h-[280px] sm:min-h-[320px]"
            >
              <div className="flex flex-col items-center text-center mb-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-green-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Briefcase className="w-8 h-8 sm:w-10 sm:h-10 text-green-700" />
                </div>

                <h2 className="text-[#065F46] font-semibold text-3xl sm:text-4xl md:text-5xl leading-tight">
                  Job Search
                </h2>
              </div>

              <p className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 text-center text-gray-600 leading-relaxed max-w-sm">
                Explore jobs, compare salaries, and discover roles that match your goals.
              </p>

              <span className="text-green-600 text-2xl sm:text-3xl">
                Explore →
              </span>
            </div>

            <div
              onClick={login}
              className="group cursor-pointer bg-white/85 backdrop-blur-lg border border-white/20 rounded-3xl p-6 sm:p-8 md:p-12 shadow-md hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 flex flex-col items-center justify-between min-h-[280px] sm:min-h-[320px]"
            >
              <div className="flex flex-col items-center text-center mb-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-blue-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10 text-blue-700" />
                </div>

                <h2 className="text-[#1E3A8A] font-semibold text-3xl sm:text-4xl md:text-5xl leading-tight">
                  Degree Search
                </h2>
              </div>

              <p className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 text-center text-gray-600 leading-relaxed max-w-sm">
                Browse degree programs and see how they connect to real career paths.
              </p>

              <span className="text-blue-700 text-2xl sm:text-3xl">
                Explore →
              </span>
            </div>
          </section>

          <section className="px-4 sm:px-8 md:px-12 pb-20 md:pb-28">
            <div className="max-w-6xl mx-auto bg-white/90 backdrop-blur-lg border border-gray-100 rounded-3xl shadow-xl p-6 sm:p-8 md:p-12">
              <div className="text-center max-w-3xl mx-auto mb-10">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#038eab] mb-3">
                  What FutureFlow Does
                </p>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 leading-tight mb-5">
                  A clearer way to plan your degree and career path.
                </h2>

                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                  FutureFlow helps students keep their academic progress and job search in one organized place.
                  Track degree completion, review current courses, explore degree options, and connect your
                  education path to real career opportunities.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 sm:p-6">
                  <div className="w-12 h-12 rounded-2xl bg-blue-700 text-white flex items-center justify-center text-xl font-semibold mb-4">
                    1
                  </div>

                  <h3 className="text-xl font-semibold text-blue-900 mb-2">
                    Track Degree Progress
                  </h3>

                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    View your completed progress, current classes, degree details, and required credits in a simple dashboard.
                  </p>
                </div>

                <div className="bg-green-50 border border-green-100 rounded-2xl p-5 sm:p-6">
                  <div className="w-12 h-12 rounded-2xl bg-green-600 text-white flex items-center justify-center text-xl font-semibold mb-4">
                    2
                  </div>

                  <h3 className="text-xl font-semibold text-green-900 mb-2">
                    Explore Career Options
                  </h3>

                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    Search jobs, review role details, compare opportunities, and save positions that match your career goals.
                  </p>
                </div>

                <div className="bg-cyan-50 border border-cyan-100 rounded-2xl p-5 sm:p-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#038eab] text-white flex items-center justify-center text-xl font-semibold mb-4">
                    3
                  </div>

                  <h3 className="text-xl font-semibold text-cyan-900 mb-2">
                    Stay Organized
                  </h3>

                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    Keep saved jobs, applied jobs, documents, and academic planning tools together so your next steps are easier to manage.
                  </p>
                </div>
              </div>

              <div className="mt-10 bg-gray-50 border border-gray-200 rounded-2xl p-5 sm:p-6 flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    Built for students planning what comes next.
                  </h3>

                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-3xl">
                    FutureFlow is designed to make degree planning and job searching feel less scattered.
                    Instead of jumping between separate tools, students can use one reliable workspace to
                    understand their academic progress and connect it to future opportunities.
                  </p>
                </div>

                <button
                  onClick={login}
                  className="w-full lg:w-auto bg-blue-800 hover:bg-blue-900 text-white px-8 py-3 rounded-full font-medium transition-colors whitespace-nowrap"
                >
                  Get Started
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}