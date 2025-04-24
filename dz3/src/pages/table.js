import React from 'react';
import '../styles/styletable.css';

import BurgerMenu from '../components/BurgerMenu';
import HikingPoll from '../components/HikingPoll';
import Footer from '../components/Footer';

function TablePage() {
  return (
    <div className="app">

       <BurgerMenu/>
       
      <div className="table-container">
        <table>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td className="merged-h" colSpan="2">Объединены ячейки</td>
            </tr>
            
            <tr>
              <td className="merged-h" colSpan="2">Объединены ячейки</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            
            <tr>
              <td></td>
              <td className="merged-h" colSpan="3">Объединены ячейки</td>
              <td></td>
            </tr>
            
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            
            <tr>
              <td className="merged-h" colSpan="2">Объединены ячейки</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            
            <tr>
              <td className="merged-v" rowSpan="2"></td>
              <td className="merged-v" rowSpan="2"></td>
              <td className="merged-v" rowSpan="2"></td>
              <td className="merged-v" rowSpan="2"></td>
              <td className="merged-v" rowSpan="2"></td>
            </tr>
            
            <tr></tr>
          </tbody>
        </table>
      </div>

      <HikingPoll/>
      <Footer/>

    </div>
  );
}

export default TablePage;