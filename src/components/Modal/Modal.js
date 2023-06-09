import React from 'react';
import './style.css'

const Modal = ({closeModal}) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <h2>You successfully reserved a flight!</h2>
                <button onClick={closeModal}>Close</button>
            </div>
        </div>
    );
};

export default Modal;