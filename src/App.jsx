import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Sidebar from './components/layout/Sidebar';
import AppRoutes from './AppRoutes';
import './styles/variables.css';
import './styles/globals.css';

const App = () => {
  // OPTIMIZATION: Dynamic state tracking for window layout scaling thresholds
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Router>
      <div style={styles.appLayout}>
        <Navbar />
        <div style={styles.mainContainer}>
          {/* Natively obscure or reveal based on layout boundaries */}
          {!isMobile && <Sidebar />}
          
          <main style={{ 
            ...styles.contentArea, 
            marginLeft: isMobile ? '0' : '256px',
            padding: isMobile ? '1rem' : '2rem' 
          }}>
            <AppRoutes />
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

const styles = {
  appLayout: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: 'var(--bg-main)',
  },
  mainContainer: {
    display: 'flex',
    flex: 1,
    marginTop: '64px',
    position: 'relative',
  },
  contentArea: {
    flex: 1,
    minHeight: 'calc(100vh - 64px)',
    overflowY: 'auto',
    boxSizing: 'border-box',
    transition: 'margin-left var(--transition-fast)',
  },
};

export default App;