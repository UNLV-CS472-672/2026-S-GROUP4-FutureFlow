import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { Logo } from '../components/Logo';
import { useAuth } from "../App";
import '../index.css';

export default function LandingPage() {
  const navigate = useNavigate();
  const { loginWithCode } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      loginWithCode(code).then(() => {
        navigate("/dashboard");
      });
    }
  }, [loginWithCode, navigate]);

  const login = () => {
    const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID;
    const domain = import.meta.env.VITE_COGNITO_DOMAIN;
    const redirectUri = import.meta.env.VITE_APP_URL;
    const scope = "email openid profile";

    window.location.href =
      `${domain}/login?client_id=${clientId}&response_type=code&scope=${scope}&redirect_uri=${redirectUri}`;
  };

  return (

    <div className="min-h-screen pt-5">

    {/* Header */}
      <header className="bg-white rounded-3xl md:rounded-full px-4 py-4 sm:px-6 shadow-lg mb-8 md:mb-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start">
            <Logo size="medium" />
          </div>

          <p className="text-base sm:text-lg md:text-xl text-blue-800 text-center md:text-left">
            {/* Insert SHORT slogan right here! */}
          </p>

          <nav className="flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-end md:gap-4">
            <button
              onClick={() => navigate('/about')}
              className="hover:underline text-blue-800 text-sm sm:text-base"
            >
              ABOUT US
            </button>

            <button
              onClick={login}
              className="hover:underline text-blue-800 text-sm sm:text-base"
            >
              LOGIN / SIGN-UP
            </button>
          </nav>
        </div>
      </header>

      <div style = {{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>

        { /* Wave Background */ }
        <div className = "wave"></div>
        <div className = "wave wave2"></div>
        <div className = "wave wave3"></div>

        <div style = {{ position: "relative", zIndex: 2 }}>

        {/* Hero Content */}
        <div className="text-center py-24 sm:py-12 md:py-16">
          <h1 className="text-[#00cac5] text:7xl sm:text-7xl md:text-8xl mb-2"> FutureFlow </h1>

          <h2 className = "text-[#00cac5] text-xl sm:text-xl md:text-xl mb-10 mx-auto leading-relaxed">
            Don't just ride the waves. Let your Future Flow.
          </h2>

          <button
            onClick={login}
            className="bg-gradient-to-r from-[#038eab] to-[#03b6be] mt-10
                       text-white px-12 py-4 sm:px-12 sm:py-4 md:px-12
                       rounded-full text-lg font-semibold text-base sm:text-lg tracking-wide
                       shadow-lg hover:shadow-xl hover:shadow-[0_10px_30px_rgba(3,182,190,0.4)]
                       transition-all duration-300
                       hover:-translate-y-1 hover:scale-[1.02] active:scale-95
                       focus:outline-none focus:ring-2 focus:ring-[#03b6be] focus:ring-offset-2"
          >
            Start Your Journey →
          </button>
        </div>

        {/* Career and Degree Search Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 sm:gap-6 md:gap-12 sm:px-10 md:px-12 sm:py-16 md:py-20">

        {/* Job Search */}
        <div className="cursor-pointer bg-white/85 backdrop-blur-lg
                        border border-white/20
                        rounded-3xl p-12 sm:p-8 md:p-12
                        shadow-md hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:-translate-y-2 hover:scale-[1.02]
                        transition-all duration-300
                        flex flex-col items-center justify-between h-full
                        active:scale-95"
             onClick = {login}>
          <h2 className="text-[#065F46] font-semibold text-4xl sm:text-4xl md:text-5xl mb-4 text-center">
            Job Search
          </h2>

          <p className="text-base sm:text-lg mb-6 sm:mb-8 text-center text-gray-600 mt-4 leading-relaxed">
            See opportunities, salaries, and real-world paths.
          </p>

          <div className="flex justify-center">
            <span className = "text-green-600 text-3xl">
              Explore →
            </span>
          </div>
        </div>

        {/* Degree Search */}
        <div className="cursor-pointer bg-white/85 backdrop-blur-lg
                        border border-white/20
                        rounded-3xl p-12 sm:p-8 md:p-12
                        shadow-md hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:-translate-y-2 hover:scale-[1.02]
                        transition-all duration-300
                        flex flex-col items-center justify-between h-full
                        active:scale-95"
              onClick = {login}>
          <h2 className="text-[#1E3A8A] font-semibold text-4xl sm:text-4xl md:text-5xl mb-4 text-center">
            Degree Search
          </h2>

          <p className="text-base sm:text-lg mb-6 sm:mb-8 text-center text-gray-600 mt-4 leading-relaxed">
            Find programs that lead to real opportunities.
          </p>

          <div className="flex justify-center">
            <span className = "text-blue-700 text-3xl">
              Explore →
            </span>
          </div>
        </div>

          </div>
        </div>
      </div>
    </div>
  );
}