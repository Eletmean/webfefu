import React from 'react';
import '../styles/styletable.css';

import BurgerMenu from '../components/BurgerMenu';
import Footer from '../components/Footer';

function TablePage() {
  return (
    <div className="page-wrapper">
      <BurgerMenu />

      <div className="content">
        <div className="table-container">
          <table>
            <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td className="merged-h" colSpan="2">Cells merged</td>
            </tr>
            
            <tr>
              <td className="merged-h" colSpan="2">Cells merged</td>
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
              <td className="merged-h" colSpan="3">Cells merged</td>
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
              <td className="merged-h" colSpan="2">Cells merged</td>
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
      </div>

      <Footer />
    </div>
  );
}

export default TablePage;