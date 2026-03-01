import React from 'react';
import { Link } from 'react-router-dom';   
const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>CrossConnect</div>
        <Link to="/">Home</Link>
        <Link to="/create">Create</Link>
        <Link to="/find">Find</Link>
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
