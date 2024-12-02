import React from 'react';

const DeleteModal = ({ show, onClose, onDelete }) => {
    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Are you sure you want to delete this employee?</h2>
                <button onClick={onDelete}>OK</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default DeleteModal;
