import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import PasswordAnalyzer from './pages/PasswordAnalyzer';
import UrlScanner from './pages/UrlScanner';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/password-analyzer" element={<PasswordAnalyzer />} />
      <Route path="/url-scanner" element={<UrlScanner />} />
      <Route path="*" element={<div style={{ padding: '3rem', textAlign: 'center' }}><h2>404: Page Not Found</h2></div>} />
    </Routes>
  );
}