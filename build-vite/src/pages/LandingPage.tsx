import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { Logo } from '../components/Logo';
import { useAuth } from "../App";

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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-blue-50 rounded-3xl mx-5 mt-5 px-8 py-6">

        {/* Header */}
        <header className="bg-white rounded-full px-6 py-4 flex items-center justify-between mb-12 shadow-lg text-md">
          <Logo size="medium" />

          <p className="text-xl text-blue-800 flex gap-8 self-end mb-2">
            "Insert SHORT slogan right here!"
          </p>

          <nav className="flex gap-4">
            <button
              onClick={() => navigate('/about')}
              className="hover:underline text-blue-800"
            >
              ABOUT US
            </button>

            <button
              onClick={login}
              className="hover:underline text-blue-800"
            >
              LOGIN / SIGN-UP
            </button>
          </nav>
        </header>

        {/* Hero Content */}
        <div className="text-center py-12">
          <h1 className="text-8xl mb-4 text-blue-900">FutureFlow</h1>

          <button
            onClick={login}
            className="bg-blue-700 hover:bg-blue-800 text-white px-12 py-4 rounded-full text-lg transition-colors"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Career and Degree Search Sections */}
      <div className="grid grid-cols-2 gap-8 px-5 py-8">

        {/* Career Search */}
        <div className="bg-white border-2 border-green-600 rounded-3xl p-12 shadow-lg">
          <h2 className="text-5xl mb-4 text-green-700">Career Search</h2>

          <p className="text-lg mb-8 text-center text-gray-700">
            "Small explanation/purpose of this box/list of bullet points."
          </p>

          <div className="flex justify-center">
            <button
              onClick={login}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full transition-colors"
            >
              Explore Careers
            </button>
          </div>
        </div>

        {/* Degree Search */}
        <div className="bg-white border-2 border-blue-700 rounded-3xl p-12 shadow-lg">
          <h2 className="text-5xl mb-4 text-blue-800">Degree Search</h2>

          <p className="text-lg mb-8 text-center text-gray-700">
            "Small explanation/purpose of this box/list of bullet points."
          </p>

          <div className="flex justify-center">
            <button
              onClick={login}
              className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-full transition-colors"
            >
              Explore Degrees
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}