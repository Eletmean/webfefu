import '../styles/poll.css';
import '../styles/burger.css';
import '../styles/Footer.css';

import BurgerMenu from '../components/BurgerMenu';
import Footer from '../components/Footer';
import HikingPoll from '../components/HikingPoll';


function Home() {

  return (
  

  <div className="page-wrapper">
    <BurgerMenu/>
  <main className="content">
    <HikingPoll />
  </main>
    <Footer />
</div>
  );
}

export default Home;