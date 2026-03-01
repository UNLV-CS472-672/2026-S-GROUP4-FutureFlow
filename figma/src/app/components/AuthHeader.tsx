import React from 'react';
import { useNavigate } from 'react-router';
import { Logo } from './Logo';
import { User } from 'lucide-react';

interface AuthHeaderProps {
  title: string;
  showYourDocuments?: boolean;
}

export function AuthHeader({ title, showYourDocuments = false }: AuthHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="bg-white rounded-full px-6 py-4 flex items-center justify-between mx-5 mt-5 shadow-lg">
      <div className="flex items-center gap-4">
        <Logo size="medium" />
        <h1 className="text-3xl text-blue-900">{title}</h1>
      </div>
      <nav className="flex items-center gap-8">
        {showYourDocuments && (
          <button onClick={() => navigate('/dashboard')} className="hover:underline text-blue-800">
            Your Documents
          </button>
        )}
        <button onClick={() => navigate('/about')} className="hover:underline text-blue-800">
          About Us
        </button>
        <button
          onClick={() => navigate('/settings')}
          className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center hover:bg-green-700 transition-colors"
        >
          <User className="w-5 h-5 text-white" />
        </button>
      </nav>
    </header>
  );
}