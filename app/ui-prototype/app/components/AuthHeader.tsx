import React from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Logo } from './Logo';
import { User } from 'lucide-react';

interface AuthHeaderProps {
  title: string;
  showYourDocuments?: boolean;
}

export function AuthHeader({ title, showYourDocuments = false }: AuthHeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isDashboardPage = location.pathname === "/dashboard";
  const isCareerCenterPage = location.pathname === "/career-center";
  const isDegreeCenterPage = location.pathname === "/degree-center";

  return (
    <header className="bg-white rounded-full px-6 py-4 flex items-center justify-between mx-5 shadow-lg">
      <div className="flex items-center gap-4">
        <Logo size="medium" />
        <h1 className="text-3xl text-blue-900">{title}</h1>
      </div>
      <nav className="flex items-center gap-4">
        {/* Home button - always show unless on dashboard */}
        {!isDashboardPage && (
          <button
            onClick={() => navigate('/dashboard')}
            className="hover:underline text-blue-800"
          >
            HOME
          </button>
        )}

        {/* conditional used to check whether user is already on Career Center page */}
        {!isCareerCenterPage && (
          <button
            onClick={() => navigate('/career-center')}
            className="hover:underline text-blue-800"
          >
            CAREER CENTER
          </button>
        )}

        {/* conditional used to check whether user is already on Degree Center page */}
        {!isDegreeCenterPage && (
          <button
            onClick={() => navigate('/degree-center')}
            className="hover:underline text-blue-800"
          >
            DEGREE CENTER
          </button>
        )}
        
        <button onClick={() => navigate('/settings', { state: { tab: 'documents' } })} className="hover:underline text-blue-800">
          YOUR DOCUMENTS
        </button>
        <button onClick={() => navigate('/about')} className="hover:underline text-blue-800">
          ABOUT US
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