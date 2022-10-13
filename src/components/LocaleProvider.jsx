import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import LocaleContext from '../contexts/LocaleContext';
import localization from '../utils/localization';

function LocaleProvider({ children }) {
  const [locale, setLocale] = useState(
    () => localStorage.getItem('locale') || 'id'
  );

  function toggleLocale() {
    setLocale((prevLocale) => {
      const newLocale = prevLocale === 'id' ? 'en' : 'id';
      localStorage.setItem('locale', newLocale);
    
      return newLocale;
    });
  }

  function translate(text) {
    if (localization[locale] && localization[locale][text])
      return localization[locale][text];
    
    return text;
  }

  const localeContextValue = useMemo(() => {
    return {
      locale,
      toggleLocale,
      translate,
    };
  });

  return (
    <LocaleContext.Provider value={localeContextValue}>
      {children}
    </LocaleContext.Provider>
  );
}

LocaleProvider.propTypes = {
  children: PropTypes.node,
};

export default LocaleProvider;
