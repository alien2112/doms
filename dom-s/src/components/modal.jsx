import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isOpen, children, onClose }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <>
            <div className="modal-overlay" onClick={onClose} />
            <div className="modal-content">
                <button onClick={onClose} className="modal-close-button">X</button>
                {children}
            </div>
        </>,
        document.getElementById('portal')
    );
};

export default Modal;
