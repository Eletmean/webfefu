import '../styles/home.css';

import iconNum from '../images/iconnum.png';
import iconEmail from '../images/iconemail.png';
import iconClock from '../images/iconclock.png';

import BurgerMenu from '../components/BurgerMenu';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import CarouselSection from '../components/CarouselSection';


function Home() {

  return (
    <div>
      <BurgerMenu/>
      <CarouselSection/>

      <h3>CONTACT</h3>
      <div className="contact-container">
        <aside className="contact-info">
          <h4>Manhattan, New York, NY, United States</h4>
          <ul className="contact-details">
            <li>
              <a href="tel:+19852451730" className="contact-link">
                <img src={iconNum} alt="phone icon" /> +1-985-245-1730
              </a>
            </li>
            <li>
              <a href="mailto:example@example.com" className="contact-link">
                <img src={iconEmail} alt="email icon" /> example@example.com
              </a>
            </li>
            <li>
              <p><img src={iconClock} alt="clock icon" /> Mon-Fri - 08:00-19:00</p>
            </li>
          </ul>
        </aside>

        <ContactForm/>

      </div>

      <Footer/>
    </div>
  
  );
}

export default Home;