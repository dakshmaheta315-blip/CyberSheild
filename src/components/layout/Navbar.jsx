import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const isDashboardRoute = location.pathname !== '/';

  return (
    <nav className="ibm-glass" style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '1rem 2rem', margin: '10px 20px', position: 'sticky', top: '10px', zIndex: 100
    }}>
      <Link to="/" style={{ color: 'var(--ibm-blue)', fontWeight: '700', textDecoration: 'none', fontSize: '1.4rem', letterSpacing: '0.5px' }}>
        CYBERSHIELD <span style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: '300' }}>360</span>
      </Link>
      
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Link to="/" style={{ color: location.pathname === '/' ? 'var(--ibm-blue)' : 'var(--text-primary)', textDecoration: 'none' }}>Home</Link>
        <Link to="/dashboard" style={{ color: isDashboardRoute ? 'var(--ibm-blue)' : 'var(--text-primary)', textDecoration: 'none', fontWeight: '500' }}>
          Console Dashboard →
        </Link>
      </div>
    </nav>
  );
}