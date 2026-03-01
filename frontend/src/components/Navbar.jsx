import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 32px",
    background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
    borderRadius: "16px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
    marginBottom: "24px",
    border: "1px solid rgba(148, 163, 184, 0.2)",
  },
  logo: {
    fontWeight: 700,
    fontSize: "1.4rem",
    color: "#0f172a",
    letterSpacing: "-0.02em",
  },
  logoAccent: {
    color: "#0ea5e9",
  },
  logoLink: {
    textDecoration: "none",
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  link: {
    textDecoration: "none",
    color: "#475569",
    fontWeight: 500,
    fontSize: "0.95rem",
    padding: "8px 16px",
    borderRadius: "10px",
    transition: "all 0.2s ease",
  },
};

const Navbar = () => {
  return (
    <nav style={styles.navbar} className="app-navbar">
      <Link to="/" style={{ ...styles.logo, ...styles.logoLink }} className="nav-logo">
        Cross<span style={styles.logoAccent}>Connect</span>
      </Link>
      <div style={styles.links}>
        <Link to="/create" style={styles.link} className="nav-link">
          Create
        </Link>
        <Link to="/find" style={styles.link} className="nav-link">
          Find
        </Link>
        <Link to="/user" style={styles.link} className="nav-link">
          User
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
