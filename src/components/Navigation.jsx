import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';
import { BiArchive } from 'react-icons/bi';

function Navigation() {
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
      </ul>
    </nav>
  );
}

export default Navigation;
