import React from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../App';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
}

export function Logo({ size = 'medium' }: LogoProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const sizeClasses = {
    small: 'w-10 h-10',
    medium: 'w-16 h-16',
    large: 'w-20 h-20',
  };

  const handleClick = () => {
    // If logged in, go to dashboard; otherwise go to landing page
    navigate(user ? '/dashboard' : '/');
  };

  return (
    <button
      onClick={handleClick}
      className={`${sizeClasses[size]} rounded-full bg-blue-700 flex items-center justify-center text-sm text-white hover:bg-blue-800 transition-colors cursor-pointer`}
    >
      &lt;Logo&gt;
    </button>
  );
}