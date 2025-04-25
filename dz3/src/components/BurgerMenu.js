import React, { useState, useEffect, useRef } from 'react'; 
import { Link } from 'react-router-dom'; //чтобы делать переходы по страницам 

import logo from '../images/logo.png';  
import basket from '../images/basket.png';
import lk from '../images/lk.png'; 

import '../styles/burger.css';

function BurgerMenu() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false); //по умолчанию закрыть  setmob для изм состояния  

  const menuRef = useRef(null); // сслылки чтобы отслеживать клики вне этих элементов (меню и кнопки меню)
  const burgerRef = useRef(null);

  const toggleMenu = () => { 
    setMobileMenuOpen(!isMobileMenuOpen); //открыто закрыто меню
  };

  // Закрытие меню при клике вне его области
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current && !menuRef.current.contains(event.target) && // target — проверяет, что клик был НЕ внутри меню, current проверка на наличие ссылки
        burgerRef.current && !burgerRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false); 
      }
    };

    // Слушаем события клика на документ
    document.addEventListener('click', handleClickOutside);

   
    return () => {
      document.removeEventListener('click', handleClickOutside);  // чтобы обработчик не остался висеть и срабатывать на каждый клик по странице
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
          className={`burger ${isMobileMenuOpen ? 'active' : ''}`} // для стилей 
          onClick={toggleMenu} //Когда пользователь кликает на бургер-кнопку, вызывается функция toggleMenu, если закрыто откроет и наоборот
          ref={burgerRef} 
        >
          <span></span> {/*полоски бургера */}
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
