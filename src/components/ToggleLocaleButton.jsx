import React from 'react';
import { useLocale } from '../hooks/locale';

function ToggleLocaleButton() {
  const { locale, toggleLocale } = useLocale();

  return (
    <button className="toggle-locale" type="button" onClick={toggleLocale}>
      {locale}
    </button>
  );
}

export default ToggleLocaleButton;
