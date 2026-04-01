import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import logo from '../assets/logo.svg';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
}

export function Logo({ size = 'medium' }: LogoProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAuthenticated = !!user;
  
  const sizeClasses = {
    small: 'w-10 h-10',
    medium: 'w-16 h-16',
    large: 'w-20 h-20',
  };

  const handleClick = () => {
    // If logged in, go to dashboard; otherwise go to landing page
    navigate(isAuthenticated ? '/dashboard' : '/');
  };

  return (
    <button
      onClick={handleClick}
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center text-sm text-white transition-colors cursor-pointer`}
    >
      <img src={logo} alt="Logo" className="w-11/12 h-11/12" />
    </button>
  );
}