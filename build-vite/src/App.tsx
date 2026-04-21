import { useState, createContext, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import DegreeCenterPage from './pages/DegreeCenterPage';
import SettingsPage from './pages/SettingsPage';
import AboutPage from './pages/AboutPage';
import EducationPage from './pages/EducationPage';
import CoursePlanPage from './pages/CoursePlanPage';
import JobSearchPage from './pages/JobSearchPage';
import JobCenterPage from './pages/JobCenterPage';
import JobDetailsPage from './pages/JobDetailsPage';
import DegreeSearchPage from './pages/DegreeSearchPage';

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
  profilePic: string | null;
  setProfilePic: (url: string | null) => void; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// ─── Dev mode bypass ───────────────────────────────────────────────────────────
const DEV_MODE = import.meta.env.VITE_DEV_MODE === 'true';

const DEV_USER: User = {
  email: 'dev@futureflow.local',
  name: 'User',
  sub: 'dev-sub-001',
};
// ───────────────────────────────────────────────────────────────────────────────

function App() {
  const [fontSize, setFontSize] = useState<FontSize>('normal');
  const [tokens, setTokens] = useState<Tokens | null>(null);
  const [user, setUser] = useState<User | null>(DEV_MODE ? DEV_USER : null);
  const [isLoading, setIsLoading] = useState(!DEV_MODE);

  const [profilePic, setProfilePic] = useState<string | null>(
    () => localStorage.getItem('profilePic')
  );

  const loginWithCode = async (code: string) => {
    if (user) return; // prevent duplicate calls

    try {
      const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID;
      const cognitoDomain = import.meta.env.VITE_COGNITO_DOMAIN;
      const redirectUri = import.meta.env.VITE_APP_URL;

      const params = new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: clientId,
        code,
        redirect_uri: redirectUri,
      });

      const res = await fetch(`${cognitoDomain}/oauth2/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

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
    if (DEV_MODE) return; // skip session restore in dev mode

    const restoreSession = async () => {
      const storedTokens = localStorage.getItem('tokens');
      const storedUser = localStorage.getItem('user');

      if (storedTokens && storedUser) {
        setTokens(JSON.parse(storedTokens));
        setUser(JSON.parse(storedUser));
      }

      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (code) {
        await loginWithCode(code);
        window.history.replaceState({}, document.title, '/dashboard'); // remove ?code
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);


  const logout = (): void => {
    // Clear state immediately (important)
    setUser(null);
    setTokens(null);

    // Clear storage
    localStorage.removeItem('tokens');
    localStorage.removeItem('user');

    if (DEV_MODE) {
      window.location.href = '/';
      return;
    }

    // Redirect to Cognito logout
    const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID;
    const cognitoDomain = import.meta.env.VITE_COGNITO_DOMAIN;
    const logoutUri = import.meta.env.VITE_APP_URL;

    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  // Prevent redirect flicker while restoring session
  if (isLoading) return <div>Loading...</div>;
  return (
    <AuthContext.Provider
      value={{ user, tokens, loginWithCode, logout, fontSize, setFontSize, profilePic, setProfilePic }}
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
            path="/job-center"
            element={user ? <JobCenterPage /> : <Navigate to="/" />}
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
            path="/course-plan"
            element={user ? <CoursePlanPage /> : <Navigate to="/" />}
          />
          <Route
            path = "/jobs"
            element = { user ? <JobSearchPage /> : <Navigate to = "/" />}
          />
          <Route
            path = "/jobs/:id"
            element = { user ? <JobDetailsPage /> : <Navigate to = "/" />}
          />
          <Route
            path = "/degree-search"
            element = { user ? <DegreeSearchPage /> : <Navigate to = "/" />}
          />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
 