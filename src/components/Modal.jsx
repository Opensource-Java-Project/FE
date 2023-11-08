import React from 'react';

function Modal({ isOpen, onClose, children, className }) {
    if (!isOpen) return null;

    return (
        <div className={`modal-overlay ${className}`}>
            <div className="modal-content">
                {children}
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default Modal;
