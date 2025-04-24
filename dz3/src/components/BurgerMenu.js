import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import logo from '../images/logo.png';  
import basket from '../images/basket.png';
import lk from '../images/lk.png'; 

import '../styles/burger.css';

function BurgerMenu() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const menuRef = useRef(null);
  const burgerRef = useRef(null);

  const toggleMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  // Закрытие меню при клике вне его области
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current && !menuRef.current.contains(event.target) && 
        burgerRef.current && !burgerRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false); 
      }
    };

    // Слушаем события клика на документ
    document.addEventListener('click', handleClickOutside);

   
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <header>
      <div className="top-navigation">
        <div className="logo-title">
          <img src={logo} alt="logo" />
          <h1>Summit Outfitters</h1>
        </div>

        <div 
          className={`burger ${isMobileMenuOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
          ref={burgerRef} 
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={`nav ${isMobileMenuOpen ? 'active' : ''}`} ref={menuRef}>
          <ul>
          <li><Link to="/" className="nav-item">HOME</Link></li>
          <li><Link to="/table" className="nav-item">ABOUT</Link></li>
          <li><Link to="/store" className="nav-item">STORE</Link></li>
          <li><Link to="/contact" className="nav-item">CONTACT</Link></li>
          <li><Link to="/cart" className="nav-item">
           <img src={basket} alt="basket" className="icon" />
          </Link></li>
         <li><Link to="/account" className="nav-item">
          <img src={lk} alt="lk" className="icon" />
          </Link></li>
         </ul>
        </div>
      </div>
    </header>
  );
}
export default BurgerMenu;
