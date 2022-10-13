import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import RequireAuth from './components/RequireAuth';
import OnlyGuest from './components/OnlyGuest';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import AddPage from './pages/AddPage';
import ArchivesPage from './pages/ArchivesPage';
import DetailPage from './pages/DetailPage';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { useAuth } from './hooks/auth';
import { useLocale } from './hooks/locale';
import BounceLoader from 'react-spinners/BounceLoader';
import ThemeContext from './contexts/ThemeContext';

function App() {
  const { initializing } = useAuth();
  const { translate: __ } = useLocale();
  const { theme } = useContext(ThemeContext);

  if (initializing)
    return (
      <div className="initialization">
        <BounceLoader color={theme === 'light' ? '#333333' : '#FFFFFF'} />
        <p>Initializing</p>
      </div>
    );

  return (
    <div className="app-container">
      <header>
        <h1>{__('Aplikasi Catatan')}</h1>
        <Navigation />
      </header>
      <main>
        <Routes>
          <Route
            path="/register"
            element={
              <OnlyGuest>
                <RegisterPage />
              </OnlyGuest>
            }
          />
          <Route
            path="/login"
            element={
              <OnlyGuest>
                <LoginPage />
              </OnlyGuest>
            }
          />
          <Route
            path="/"
            element={
              <RequireAuth>
                <HomePage />
              </RequireAuth>
            }
          />
          <Route
            path="/add"
            element={
              <RequireAuth>
                <AddPage />
              </RequireAuth>
            }
          />
          <Route
            path="/archives"
            element={
              <RequireAuth>
                <ArchivesPage />
              </RequireAuth>
            }
          />
          <Route
            path="/notes/:id"
            element={
              <RequireAuth>
                <DetailPage />
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <ToastContainer
        position="bottom-left"
        theme={theme}
        autoClose="3000"
        hideProgressBar="false"
        closeOnClick="true"
        pauseOnHover="true"
      />
    </div>
  );
}

export default App;
