import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { Logo } from '../components/Logo';
import { useAuth } from "../App";

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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-50 rounded-3xl mx-3 mt-3 px-4 py-4 sm:mx-5 sm:mt-5 sm:px-6 sm:py-6 md:px-8">

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

        {/* Hero Content */}
        <div className="text-center py-10 sm:py-12 md:py-16">
          <h1 className="text-4xl sm:text-6xl md:text-8xl mb-4 text-blue-900">
            FutureFlow
          </h1>

          <button
            onClick={login}
            className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 sm:px-10 sm:py-4 md:px-12 rounded-full text-base sm:text-lg transition-colors"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Career and Degree Search Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 px-3 py-6 sm:px-5 sm:py-8">

        {/* Job Search */}
        <div className="bg-white border-2 border-green-600 rounded-3xl p-6 sm:p-8 md:p-12 shadow-lg">
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4 text-green-700 text-center">
            Job Search
          </h2>

          <p className="text-base sm:text-lg mb-6 sm:mb-8 text-center text-gray-700">
            Small explanation/purpose of this box/list of bullet points.
          </p>

          <div className="flex justify-center">
            <button
              onClick={login}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 sm:px-8 rounded-full transition-colors"
            >
              Explore Careers
            </button>
          </div>
        </div>

        {/* Degree Search */}
        <div className="bg-white border-2 border-blue-700 rounded-3xl p-6 sm:p-8 md:p-12 shadow-lg">
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4 text-blue-800 text-center">
            Degree Search
          </h2>

          <p className="text-base sm:text-lg mb-6 sm:mb-8 text-center text-gray-700">
            Small explanation/purpose of this box/list of bullet points.
          </p>

          <div className="flex justify-center">
            <button
              onClick={login}
              className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 sm:px-8 rounded-full transition-colors"
            >
              Explore Degrees
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}