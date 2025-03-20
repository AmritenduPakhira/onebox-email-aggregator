import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard.js';
import EmailPage from './pages/EmailPage.js';
import SearchPage from './pages/SearchPage.js';
import NotFound from './pages/NotFound.js';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/emails/:id" element={<EmailPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default AppRoutes;
