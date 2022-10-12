import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import AuthContext from '../contexts/AuthContext';
import { getUserLogged, putAccessToken } from '../utils/network-data';

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const { data } = await getUserLogged();
      
      setUser(data);
      setInitializing(false);
    }
    
    fetchUser();
  }, []);

  async function loginSuccess({ accessToken }, callback) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();

    setUser(data);

    callback();
  }

  function logout(callback) {
    setUser(null);
    putAccessToken('');

    callback();
  }

  const authContextValue = useMemo(() => {
    return {
      user,
      initializing,
      loginSuccess,
      logout,
    };
  }, [user, initializing]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
