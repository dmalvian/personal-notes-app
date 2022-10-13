import { useContext } from 'react';
import LocaleContext from '../contexts/LocaleContext';

function useLocale() {
  return useContext(LocaleContext);
}

export {
  useLocale,
}