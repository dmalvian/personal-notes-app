import React from 'react';

const LocaleContext = React.createContext(null);

export const LocaleProvider = LocaleContext.Provider;
export const LocaleConsumer = LocaleContext.Consumer;

export default LocaleContext;
