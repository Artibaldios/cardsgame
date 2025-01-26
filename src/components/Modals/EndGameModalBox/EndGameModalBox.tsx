import React from 'react';
import './EndGameModalBox.css';

interface ModalProps {
    message: string;
    onRestart: () => void;
    isOpen: boolean;
}

const EndGameModalBox: React.FC<ModalProps> = ({ message, onRestart, isOpen }) => {
    if (!isOpen) return null;
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="modal-title">Game Over</h2>
                <p className="modal-message">{message}</p>
                <button className="modal-button" onClick={onRestart}>
                    Restart Game
                </button>
            </div>
        </div>
    );
};


export default EndGameModalBox;