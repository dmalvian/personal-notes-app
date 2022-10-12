import React from 'react';
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

function App() {
  const { user, initializing } = useAuth();

  if (initializing) return <p>Loading</p>;

  return (
    <div className="app-container">
      <header>
        <h1>Personal Notes App</h1>
        {user ? <Navigation /> : ''}
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
      <ToastContainer />
    </div>
  );
}

export default App;
