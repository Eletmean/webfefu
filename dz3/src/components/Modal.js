import React from 'react';

function Modal({ children, onClose }) { //сhildren  содержит всё  переданное между открывающим и закрывающим тегом компонента
  return (
    <div className="modal-overlay">
      <div className="modal-window">
        <button className="modal-close" onClick={onClose}>×</button> 
        {children}
      </div>
    </div>
  );
}

export default Modal;
