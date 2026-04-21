import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { Logo } from '../components/Logo';
import { useAuth } from "../App";

interface AuthHeaderProps {
  title: string;
}

export function NonAuthHeader({ title }: AuthHeaderProps) {

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
          : "rounded-full mx-5 px-6 py-4"   // floating pill
      }`}
    >
      <div className="flex items-center gap-4">
        <Logo size="medium" />
        <h1 className="text-3xl font-semibold text-[#067c95]">{title}</h1>
      </div>
      <nav className="flex font-medium items-center gap-4">
        {/* executive change to have tab appear permanently */}
        
        {/* About Us tab on the header */}
        <button onClick={() => navigate('/about')} className="hover:underline text-[#067c95]">
          ABOUT US
        </button>

        { /* Log-In / Sign-Up Header */ }
        <button onClick = {login} className = "hover:underline text-[#067c95]">
          LOGIN / SIGN-UP
        </button>

      </nav>
    </header>
  );
}