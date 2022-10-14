import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiHome, FiArchive, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../hooks/auth';
import ToggleThemeButton from './ToggleThemeButton';
import ToggleLocaleButton from './ToggleLocaleButton';
import path from '../utils/path';

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
      <Link to={path.HOME}>
        <FiHome />
      </Link>
      <Link to={path.ARCHIVES}>
        <FiArchive />
      </Link>
      <button
        className="button-logout"
        type="button"
        onClick={() => {
          logout(() => {
            navigate(path.HOME);
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
