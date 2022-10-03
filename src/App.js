import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import AddPage from './pages/AddPage';
import ArchivesPage from './pages/ArchivesPage';
import DetailPage from './pages/DetailPage';
import NotFoundPage from './pages/NotFoundPage';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="app-container">
      <header>
        <h1>Personal Notes App</h1>
        <Navigation />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddPage />} />
          <Route path="/archives" element={<ArchivesPage />} />
          <Route path="/notes/:id" element={<DetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <ToastContainer />
    </div>
  );
}

export default App;
