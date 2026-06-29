import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/variables.css';
import '../../styles/globals.css';

const Sidebar = () => {
  // FIXED: Paths updated from '/analyzer' and '/scanner' to match AppRoutes definitions
  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/password-analyzer', label: 'Password Analyzer', icon: '🔑' },
    { path: '/url-scanner', label: 'URL Scanner', icon: '🌐' },
    { path: '/learn', label: 'Learn Cyber', icon: '📖' },
    { path: '/quiz', label: 'Knowledge Quiz', icon: '🧩' },
    { path: '/chat', label: 'AI Security Chat', icon: '💬' },
  ];

  return (
    <aside className="glass-panel" style={styles.sidebar}>
      <div style={styles.sectionLabel}>SECURITY UTILITIES</div>
      <div style={styles.menuContainer}>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => isActive ? { ...styles.sidebarLink, ...styles.activeLink } : styles.sidebarLink}
          >
            <span style={styles.icon}>{item.icon}</span>
            <span style={styles.label}>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </aside>
  );
};

const styles = {
  sidebar: {
    position: 'fixed',
    top: '64px',
    left: 0,
    bottom: 0,
    width: '256px',
    borderRadius: 0,
    borderRight: '1px solid var(--border-color)',
    padding: '1.5rem 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    zIndex: 990,
  },
  sectionLabel: {
    fontSize: '0.75rem',
    fontWeight: 700,
    color: 'var(--text-muted)',
    padding: '0 1.5rem',
    letterSpacing: '1px',
    marginBottom: '0.5rem',
  },
  menuContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  sidebarLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '0.85rem 1.5rem',
    color: 'var(--text-muted)',
    textDecoration: 'none',
    fontSize: '0.875rem',
    fontWeight: 500,
    borderLeft: '4px solid transparent',
    transition: 'all var(--transition-fast)',
  },
  activeLink: {
    color: 'var(--text-main)',
    backgroundColor: 'rgba(15, 98, 254, 0.1)',
    borderLeft: '4px solid var(--primary)',
  },
  icon: {
    fontSize: '1.1rem',
  },
  label: {
    letterSpacing: '0.2px',
  }
};

export default Sidebar;