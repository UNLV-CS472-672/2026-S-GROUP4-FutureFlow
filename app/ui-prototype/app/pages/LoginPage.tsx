// src/app/pages/LoginPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../App';
import { Logo } from '../components/Logo';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
        {/* Logo and Brand */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <Logo size="medium" />
          <h1 className="text-4xl font-extrabold">FutureFlow</h1>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-center mb-2 text-gray-800">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border-2 border-blue-700 rounded-full px-6 py-3 outline-none focus:ring-4 focus:ring-blue-300 transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-center mb-2 text-gray-800">Password</label>
            <input
              type="password"
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border-2 border-blue-700 rounded-full px-6 py-3 outline-none focus:ring-4 focus:ring-blue-300 transition-all"
              required
            />
            {/* Optional: Forgot Password Link */}
            <p
              onClick={() => alert('Forgot password flow coming soon!')}
              className="text-center mt-2 text-blue-700 cursor-pointer hover:underline text-sm"
            >
              Forgot Password?
            </p>
          </div>

          <div className="space-y-3">
            <button
              type="submit"
              className="w-full bg-blue-700 text-white rounded-full px-6 py-3 hover:scale-105 transform transition duration-200"
            >
              LOG-IN
            </button>
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="w-full border-2 border-blue-700 text-blue-700 rounded-full px-6 py-3 hover:scale-105 transform transition duration-200"
            >
              SIGN-UP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}