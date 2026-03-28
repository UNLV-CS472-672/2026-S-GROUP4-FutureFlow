import { useState, createContext, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import DegreeCenterPage from './pages/DegreeCenterPage';
import CareerCenterPage from './pages/CareerCenterPage';
import SettingsPage from './pages/SettingsPage';
import AboutPage from './pages/AboutPage';
import EducationPage from './pages/EducationPage';
import ResumeUploadPage from './pages/ResumeUploadPage';
import CareerQuiz from './pages/CareerQuiz';
import CoursePlanPage from './pages/CoursePlanPage';
import TranscriptUploadPage from './pages/TranscriptUploadPage';

interface User {
  email: string;
  name?: string;
  sub?: string;
}

type Tokens = {
  accessToken: string;
  idToken: string;
  refreshToken?: string;
};

type FontSize = 'small' | 'normal' | 'large';

interface AuthContextType {
  user: User | null;
  tokens: Tokens | null;
  loginWithCode: (code: string) => Promise<void>;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  logout: () => void; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

function App() {
  const [fontSize, setFontSize] = useState<FontSize>('normal');
  const [tokens, setTokens] = useState<Tokens | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loginWithCode = async (code: string) => {
    if (user) return; // prevent duplicate calls

    try {
      const params = new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: '58koplp30bju3c58suq5505b8q',
        code,
        redirect_uri: import.meta.env.VITE_APP_URL,
      });

      const res = await fetch(
        'https://us-east-1j1ioyaxog.auth.us-east-1.amazoncognito.com/oauth2/token',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: params.toString(),
        }
      );

      if (!res.ok) {
        throw new Error('Token exchange failed');
      }

      const data = await res.json();

      const formattedTokens: Tokens = {
        accessToken: data.access_token,
        idToken: data.id_token,
        refreshToken: data.refresh_token,
      };

      setTokens(formattedTokens);
      localStorage.setItem('tokens', JSON.stringify(formattedTokens));

      const payload = JSON.parse(atob(data.id_token.split('.')[1]));

      const userData: User = {
        email: payload.email,
        name: payload.name,
        sub: payload.sub,
      };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));

      // Remove ?code from URL after login
      window.history.replaceState({}, document.title, '/');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  useEffect(() => {
    const storedTokens = localStorage.getItem('tokens');
    const storedUser = localStorage.getItem('user');

    if (storedTokens && storedUser) {
      setTokens(JSON.parse(storedTokens));
      setUser(JSON.parse(storedUser));
    }

    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      loginWithCode(code).then(() => {
        window.location.href = "/dashboard"; // 🔥 THIS IS THE FIX
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  const logout = (): void => {
    // Clear state immediately (important)
    setUser(null);
    setTokens(null);

    // Clear storage
    localStorage.removeItem('tokens');
    localStorage.removeItem('user');

    // Redirect to Cognito logout
    const clientId = "58koplp30bju3c58suq5505b8q";
    const logoutUri = import.meta.env.VITE_APP_URL;
    const cognitoDomain = "https://us-east-1j1ioyaxog.auth.us-east-1.amazoncognito.com";

    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  // Prevent redirect flicker while restoring session
  if (isLoading) return <div>Loading...</div>;
  return (
    <AuthContext.Provider
      value={{ user, tokens, loginWithCode, logout, fontSize, setFontSize }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route path="/about" element={<AboutPage />} />

          <Route
            path="/dashboard"
            element={user ? <DashboardPage /> : <Navigate to="/" />}
          />
          <Route
            path="/degree-center"
            element={user ? <DegreeCenterPage /> : <Navigate to="/" />}
          />
          <Route
            path="/career-center"
            element={user ? <CareerCenterPage /> : <Navigate to="/" />}
          />
          <Route
            path="/settings"
            element={user ? <SettingsPage /> : <Navigate to="/" />}
          />
          <Route
            path="/education"
            element={user ? <EducationPage /> : <Navigate to="/" />}
          />
          <Route
            path="/resume-upload"
            element={user ? <ResumeUploadPage /> : <Navigate to="/" />}
          />
          <Route
            path="/career-quiz"
            element={user ? <CareerQuiz /> : <Navigate to="/" />}
          />
          <Route
            path="/course-plan"
            element={user ? <CoursePlanPage /> : <Navigate to="/" />}
          />
          <Route
            path="/transcript-upload"
            element={user ? <TranscriptUploadPage /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;