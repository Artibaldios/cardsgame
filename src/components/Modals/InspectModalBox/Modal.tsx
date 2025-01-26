import React from 'react';
import './Modal.css';
import { iCard } from "../../../types/interfaces";

interface ModalProps {
    show: boolean;
    onRestart: () => void;
    onClose: () => void;
    highlightedCards: iCard[];
  }

const Modal: React.FC<ModalProps> = ({ show, onClose, onRestart, highlightedCards }) => {

  if (!show) return null;
  let infoMessage = "";
  let killerCardDetected = false;
  let restartFlag = false;

  const handleModalClick = () => {
    if(restartFlag){
      onRestart();
    } else {
      onClose();
    }
  }


  highlightedCards.map((card) => {
      if (card.status === "killer"){
          killerCardDetected = true;
      }
      return card
  });
  if (highlightedCards.length > 1) {
    if(killerCardDetected){
        infoMessage = "there is a killer among them";
    } else {
        infoMessage = "there is no killer among them";
    }
  } else {
    if(killerCardDetected){
      infoMessage = "Congratulations, you found the killer!";
      restartFlag = true;
  } else {
      infoMessage = "You are mistaken, the person is innocent";
  }
  }
  return (
    <div className="modal-overlay">
      <div className="modal-content">
          {highlightedCards.length > 0 ? (
            <h2>{infoMessage}</h2>
          ) : (
            <p>No cards are highlighted.</p>
          )}
          <button onClick={handleModalClick} >Close</button>
      </div>
    </div>
  );
};

export default Modal;