import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/auth';
import PropTypes from 'prop-types';

function OnlyGuest({ children }) {
  const auth = useAuth();

  if (auth.user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

OnlyGuest.propTypes = {
  children: PropTypes.node,
}

export default OnlyGuest;
