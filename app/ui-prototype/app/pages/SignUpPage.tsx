import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../App';
import { Logo } from '../components/Logo';

export default function SignUpPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    signup(firstName, lastName, email, password);
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

        {/* Sign Up Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-center mb-2 text-gray-800">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full bg-white border-2 border-blue-700 rounded-full px-6 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-center mb-2 text-gray-800">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full bg-white border-2 border-blue-700 rounded-full px-6 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

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

          <div>
            <label className="block text-center mb-2 text-gray-800">Re-Enter Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-white border-2 border-blue-700 rounded-full px-6 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white rounded-full px-6 py-3 transition-colors"
          >
            SIGN-UP
          </button>
        </form>

        <p className="text-center mt-6">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="underline hover:no-underline"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}