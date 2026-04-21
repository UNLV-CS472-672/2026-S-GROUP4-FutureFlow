import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { useAuth } from "../App";
import { NonAuthHeader } from '../components/NonAuthHeader';
import '../index.css';

export default function LandingPage() {
  const navigate = useNavigate();
  const { loginWithCode } = useAuth();

  // Handle Cognito redirect (?code=...)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      loginWithCode(code).then(() => {
        navigate("/dashboard");
      });
    }
  }, [loginWithCode, navigate]);

  // Redirect user to Cognito Hosted UI
  const login = () => {
    const clientId = "58koplp30bju3c58suq5505b8q";
    const domain = "https://us-east-1j1ioyaxog.auth.us-east-1.amazoncognito.com";
    const redirectUri = import.meta.env.VITE_APP_URL;
    const scope = "email+openid+profile";

    window.location.href =
      `${domain}/login?client_id=${clientId}&response_type=code&scope=${scope}&redirect_uri=${redirectUri}`;
  };

  return (

    <div className="min-h-screen pt-5">

      <NonAuthHeader title = "Homepage"/>

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