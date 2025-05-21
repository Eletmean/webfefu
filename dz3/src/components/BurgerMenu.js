import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import basket from '../images/basket.png';
import lk from '../images/lk.png';
import '../styles/burger.css';

function BurgerMenu() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false); // для отслеживания состояния (открыто/закрыто и изменение)
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const menuRef = useRef(null); // проверка был ли клик внутри меню если нет то закрываем меню 
  const burgerRef = useRef(null); // тоже самое для бургера

  const toggleMenu = () => { // открывем закрываем бургир
    setMobileMenuOpen(!isMobileMenuOpen);
    setActiveSubmenu(null); // Закрываем все подменю при открытии/закрытии бургера
  };

  const toggleSubmenu = (menuName, e) => {
    e.stopPropagation(); //нужно чтобы клик по подменю не срабатывал как клик вне меню
    setActiveSubmenu(activeSubmenu === menuName ? null : menuName); // чтобы соотв подменю скрылось или открылось 
  }; 

  useEffect(() => {
    const handleClickOutside = (event) => { //Обработчик клика вне меню
      if (
        menuRef.current && !menuRef.current.contains(event.target) && //contains проверяет элемент, по которому кликнули, внутри меню иои нет
        burgerRef.current && !burgerRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false); //клик вне элементов, все закрывеам 
        setActiveSubmenu(null);
      }
    };
    document.addEventListener('click', handleClickOutside); //попдключаем проверку клика на весь документ.
    return () => {
      document.removeEventListener('click', handleClickOutside); // выкл проверку
    };
  }, []);

  const menuData = {
    "HOME": [
      { text: "Home", link: "/" },
      { text: "News", link: "/news" },
      { text: "Promo", link: "/promo" }
    ],
    "ABOUT": [
      { text: "Table", link: "/table" },
      { text: "Bank", link: "/bank" },
      { text: "Contracts", link: "/contracts" }
    ],
    "POLL": [
      { text: "Poll", link: "/poll" },
      { text: "Voting", link: "/voting" },
      { text: "Survey", link: "/survey" }
    ],
    "CONTACT": [
      { text: "Emergency", link: "/emergency" },
      { text: "Payments", link: "/payments" },
      { text: "Student-help", link: "/student-help" }
    ]
  };

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
          <ul className="main-menu">
            {Object.keys(menuData).map((menuKey) => (
              <li className="menu-item" key={menuKey}>
                <div 
                  className="nav-item"
                  onClick={(e) => toggleSubmenu(menuKey, e)}
                >
                  {menuKey}
                </div>
                <ul className={`submenu ${activeSubmenu === menuKey ? 'active' : ''}`}>
                  {menuData[menuKey].map((item) => (
                    <li key={item.text}>
                      <Link to={item.link} className="submenu-link">{item.text}</Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
            <li className="menu-item">
              <Link to="/cart" className="nav-item">
                <img src={basket} alt="basket" className="icon" />
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/account" className="nav-item">
                <img src={lk} alt="lk" className="icon" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default BurgerMenu;