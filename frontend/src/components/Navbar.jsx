import React from 'react';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>CrossConnect</div>
      <ul style={styles.navLinks}>
        <li><a href="#" style={styles.link}>Home</a></li>
        <li><a href="#" style={styles.link}>Find</a></li>
        <li><a href="#" style={styles.link}>Create</a></li>
        <li><a href="#" style={styles.link}>Profile</a></li>
      </ul>
      <input type="search" placeholder="Search..." style={styles.searchInput}  />
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 40px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    color: '#333',
  },
  navLinks: {
    listStyle: 'none',
    display: 'flex',
    gap: '20px',
    margin: 0,
    padding: 0,
  },
  link: {
    textDecoration: 'none',
    color: '#333',
    fontWeight: 500,
    transition: 'color 0.3s ease',
  },
  searchInput: {
    padding: '6px 12px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '1rem',
  },
};

export default Navbar;
