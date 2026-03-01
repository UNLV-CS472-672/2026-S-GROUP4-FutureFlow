import React, { useState, createContext, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import DegreeCenterPage from './pages/DegreeCenterPage';
import CareerCenterPage from './pages/CareerCenterPage';
import SettingsPage from './pages/SettingsPage';
import AboutPage from './pages/AboutPage';
import EducationPage from './pages/EducationPage';
import ResumeUploadPage from './pages/ResumeUploadPage';
import CareerQuiz from './pages/CareerQuiz';
import CoursePlanPage from './pages/CoursePlanPage';

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

type FontSize = 'small' | 'normal' | 'large';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  signup: (firstName: string, lastName: string, email: string, password: string) => void;
  logout: () => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
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
  const [user, setUser] = useState<User | null>(null);
  const [fontSize, setFontSize] = useState<FontSize>('normal');

  // Apply font size class to body element
  useEffect(() => {
    document.documentElement.className = `font-size-${fontSize}`;
  }, [fontSize]);

  const login = (email: string, password: string) => {
    // Mock login - in real app this would call an API
    setUser({
      firstName: 'John',
      lastName: 'Doe',
      email: email,
    });
  };

  const signup = (firstName: string, lastName: string, email: string, password: string) => {
    // Mock signup
    setUser({
      firstName,
      lastName,
      email,
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, fontSize, setFontSize }}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
          <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <SignUpPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/dashboard"
            element={user ? <DashboardPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/degree-center"
            element={user ? <DegreeCenterPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/career-center"
            element={user ? <CareerCenterPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/settings"
            element={user ? <SettingsPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/education"
            element={user ? <EducationPage /> : <Navigate to="/login" />}
          />
          {/* Resume Upload Page Addition */}
          <Route
            path="/resume-upload"
            element={user ? <ResumeUploadPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/career-quiz"
            element={user ? <CareerQuiz /> : <Navigate to="/login" />}
          />
          <Route
            path="/course-plan"
            element={user ? <CoursePlanPage /> : <Navigate to="/login" />}
          />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;