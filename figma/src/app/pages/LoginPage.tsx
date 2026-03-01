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
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo and Brand */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <Logo size="medium" />
          <h1 className="text-5xl">FutureFlow</h1>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-center mb-2 text-gray-800">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border-2 border-blue-700 rounded-full px-6 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-center mb-2 text-gray-800">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border-2 border-blue-700 rounded-full px-6 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="space-y-3">
            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-800 text-white rounded-full px-6 py-3 transition-colors"
            >
              LOG-IN
            </button>
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="w-full bg-green-600 hover:bg-green-700 text-white rounded-full px-6 py-3 transition-colors"
            >
              SIGN-UP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}