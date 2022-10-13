import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiHome, FiArchive, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../hooks/auth';
import ToggleThemeButton from './ToggleThemeButton';
import ToggleLocaleButton from './ToggleLocaleButton';

function Navigation() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  if (!user) {
    
    return (
      <nav className="navigation">
        <ToggleLocaleButton />
        <ToggleThemeButton />
      </nav>
    );
  }

  return (
    <nav className="navigation">
      <ToggleLocaleButton />
      <ToggleThemeButton />
      <div className="separator" />
      <Link to="/">
        <FiHome />
      </Link>
      <Link to="/archives">
        <FiArchive />
      </Link>
      <button
        className="button-logout"
        type="button"
        onClick={() => {
          logout(() => {
            navigate('/');
          });
        }}
      >
        <FiLogOut />
        {user.name}
      </button>
    </nav>
  );
}

export default Navigation;
