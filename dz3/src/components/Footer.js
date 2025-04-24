import React from 'react';
import '../styles/Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <nav className="footer-nav">
          <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/table">About</Link></li>
          <li><Link to="/store">Store</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
        <p className="copyright">
          Copyright &copy; 2025 All rights reserved - Summit Outfitters
        </p>
      </div>
    </footer>
  );
}

export default Footer;
