import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiHome, FiLogOut } from 'react-icons/fi';
import { BiArchive } from 'react-icons/bi';
import { useAuth } from '../hooks/auth';

function Navigation() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <nav className="navigation">
      <ul>
        <li>
          <Link to="/">
            <FiHome />
          </Link>
        </li>
        <li>
          <Link to="/archives">
            <BiArchive />
          </Link>
        </li>
        <li>
          <button
            onClick={() => {
              logout(() => {
                navigate('/');
              });
            }}
          >
            <FiLogOut />
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
