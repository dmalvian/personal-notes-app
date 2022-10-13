import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from '../contexts/ThemeContext';

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'light'
  );

  function toggleTheme() {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
    
      return newTheme;
    });
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const themeContextValue = useMemo(() => {
    return {
      theme,
      toggleTheme,
    };
  });

  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node,
};

export default ThemeProvider;
