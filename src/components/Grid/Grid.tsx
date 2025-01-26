import React, { useState, useEffect } from 'react';
import InspectModalBox from '../Modals/InspectModalBox/Modal';
import EndGameModalBox from '../Modals/EndGameModalBox/EndGameModalBox';
import RulesModalBox from '../Modals/RulesModalBox/RulesModalBox';
import Card from "../Card/Card";
import { iCard } from "../../types/interfaces";
import { initialCards } from '../../initialData/data';
import {
  moveCardsRight,
  moveCardsLeft,
  moveCardsUp,
  moveCardsDown,
  findNeighbors,
  findKillerCardPosition,
  killRandomCard,
} from '../../utils/helpers';

const Grid: React.FC = () => {

  const [cards, setCards] = useState<iCard[]>(initialCards);
  const [inspectMode, setInspectMode] = useState(false); // State to track highlighting
  const [arrestMode, setArrestMode] = useState(false); // State to track arresting
  const [modalVisible, setModalVisible] = useState(false);
  const [highlightedCards, setHighlightedCards] = useState<iCard[]>([]);
  const [isVisible, setIsVisible] = useState(true); // Start with content visible
  const [isBtnDisabled, setIsBtnDisabled] = useState(false); // State to manage
  const [checkBtnDisabled, setCheckBtnDisabled] = useState(false); // State to manage
  const [isModalOpen, setIsModalOpen] = useState(false); // modal for end of the game
  //const [isTouching, setIsTouching] = useState(false);

  // Load images dynamically
  useEffect(() => {
    setRandomCardKiller();
  }, []);


  const handleKill = () => {
    setCards(prevCards => {
      const killerPosition = findKillerCardPosition(prevCards);
      const neighborsArray = findNeighbors(killerPosition, prevCards);
      const updatedCards = killRandomCard(prevCards, neighborsArray);
      return updatedCards;
    });
  };

  const handleMove = () => {
    setCards(prevCards => {
      const movingFunctionsArray = [moveCardsRight, moveCardsLeft, moveCardsUp, moveCardsDown];
      const randomIndex = Math.floor(Math.random() * movingFunctionsArray.length);
      const updatedCards = movingFunctionsArray[randomIndex](prevCards, randomIndex);
      //const updatedCards = moveCardsRight(prevCards, 1);
      return updatedCards;
    });
  };

  const inspectMouseMove = (event: React.MouseEvent) => {
    if (!inspectMode) return;

    const gridElement = event.currentTarget;
    const rect = gridElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    let columnIndex = Math.floor((x / (rect.width / 4)));
    let rowIndex = Math.floor((y / (rect.height / 4)));

    columnIndex = Math.max(0, Math.min(columnIndex, 3));
    rowIndex = Math.max(0, Math.min(rowIndex, 3));

    const newCards = cards.map(card => ({ ...card, highlighted: false }));

    for (let i = rowIndex; i < rowIndex + 2; i++) {
      for (let j = columnIndex; j < columnIndex + 2; j++) {
        if (i < 4 && j < 4) {
          newCards[i * 4 + j].highlighted = true;
        }
      }
    }
    setCards(newCards);
  };

  const inspectTouchStart = () => {
    // if (!inspectMode) return;
    // setIsTouching(true);
    // const touch = event.touches[0]; // Get the first touch point
    // updateHighlight(touch.clientX, touch.clientY, event.currentTarget);
  };

  // const updateHighlight = (clientX: number, clientY: number, gridElement: EventTarget) => {
  //   const rect = (gridElement as HTMLElement).getBoundingClientRect();
  //   const x = clientX - rect.left;
  //   const y = clientY - rect.top;
  //   let columnIndex = Math.floor((x / (rect.width / 4)));
  //   let rowIndex = Math.floor((y / (rect.height / 4)));

  //   columnIndex = Math.max(0, Math.min(columnIndex, 3));
  //   rowIndex = Math.max(0, Math.min(rowIndex, 3));

  //   const newCards = cards.map(card => ({ ...card, highlighted: false }));

  //   for (let i = rowIndex; i < rowIndex + 2; i++) {
  //     for (let j = columnIndex; j < columnIndex + 2; j++) {
  //       if (i < 4 && j < 4) {
  //         newCards[i * 4 + j].highlighted = true;
  //       }
  //     }
  //   }
  //   setCards(newCards);
  // };

  const arrestMouseMove = (event: React.MouseEvent) => {
    if (!arrestMode) return;
    const gridElement = event.currentTarget;
    const rect = gridElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    let columnIndex = Math.floor((x / (rect.width / 4)));
    let rowIndex = Math.floor((y / (rect.height / 4)));

    columnIndex = Math.max(0, Math.min(columnIndex, 3));
    rowIndex = Math.max(0, Math.min(rowIndex, 3));

    const newCards = cards.map(card => ({ ...card, highlighted: false }));

    for (let i = rowIndex; i < rowIndex + 1; i++) {
      for (let j = columnIndex; j < columnIndex + 1; j++) {
        if (i < 4 && j < 4) {
          newCards[i * 4 + j].highlighted = true;
        }
      }
    }
    setCards(newCards);
  };

  // Function to handle mouse move and highlight 2x2 area
  const handleMouseMove = (event: React.MouseEvent) => {
    inspectMouseMove(event);
    arrestMouseMove(event);
  };

  // Function to handle card click
  const handleCardClick = () => {
    //if (!isTouching) {
      handleArrestClick();
      handleHighlightClick();
    //}
  };

  const handleCardTouch = () => {
    if ((arrestMode && inspectMode === false) || (arrestMode === false && inspectMode)){
      handleArrestClick();
      handleHighlightClick();
      setCheckBtnDisabled(true);
    }
  };

  // Function to handle card click and alert arrested card info
  const handleArrestClick = () => {
    if (!arrestMode) return;

    const highlighted = cards.filter(card => card.highlighted);
    if (highlighted.length > 0) {
      setIsBtnDisabled(true);
      setHighlightedCards(highlighted);
      setModalVisible(true);
      setArrestMode(false);
    } else {
      alert('No cards are highlighted.');
    }
  };

  // Function to set highlighted cards
  const handleHighlightClick = () => {
    if (!inspectMode) return;

    const highlighted = cards.filter(card => card.highlighted);
    if (highlighted.length > 0) {
      setIsBtnDisabled(true);
      setHighlightedCards(highlighted);
      setModalVisible(true);
      setInspectMode(false);
    } else {
      alert('No cards are highlighted.');
    }
  };

  const toggleHighlighting = () => {
    setInspectMode(prev => !prev);
    setIsBtnDisabled(prev => !prev);
  };

  const toggleArresting = () => {
    setArrestMode(prev => !prev);
    setIsBtnDisabled(prev => !prev);
  };

  const handleModalClick = () => {
    setModalVisible(false);
    setInspectMode(false);
  }

  // Function to change the color of a random card
  const setRandomCardKiller = () => {
    const randomIndex = Math.floor(Math.random() * initialCards.length);
    const newCards = initialCards.map((card, index) => {
      if (index === randomIndex) {
        return { ...card, status: "killer" };
      }
      return card;
    });
    setCards(newCards);
  };

  const handleHighlightingOFF = () => {
    setCards(prevCards => prevCards.map(card => ({
      ...card,
      highlighted: false
    })));
  };

  const handleNextTurn = () => {
    setIsVisible(false);
    setTimeout(() => {
      handleKill();
      handleMove();
      handleHighlightingOFF();
      checkGameStatus();
      setIsVisible(true);
      setIsBtnDisabled(false);
      setCheckBtnDisabled(false);
      setArrestMode(false);
      setInspectMode(false);
    }, 1000);

  };

  const countLiveFalse = cards.filter(card => card.live === false).length;
  const killer = cards.find((card) => { if (card.status === "killer") return card.name })
  const checkGameStatus = () => {
    if (countLiveFalse >= 4) {
      setIsModalOpen(true);
    }
  };

  // Function to reset states
  const restartGame = () => {
    setCards(initialCards);
    setIsModalOpen(false);
    setInspectMode(false);
    setArrestMode(false);
    setModalVisible(false);
    setIsBtnDisabled(false);
    setRandomCardKiller();
  };

  return (
    <>
      <section className="main-grid-elements">
        <div className='killed-info'>
          <h1 >Days left: {5 - countLiveFalse}</h1>
        </div>
        <div
          className={` grid content ${isVisible ? 'visible' : 'hidden'}`}
          onMouseMove={handleMouseMove}
        //onTouchStart={inspectTouchStart}
        >
          {cards.map(card => (
            <Card key={card.id} card={card} handleCardClick={handleCardClick} handleTouch={inspectTouchStart}></Card>
          ))}
        </div>
        <button
          className='main-buttons touch-button'
          onTouchStart={handleCardTouch}
          disabled={checkBtnDisabled}
        >
          Check
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30px" height="30px">
            <path d="M 20.292969 5.2929688 L 9 16.585938 L 4.7070312 12.292969 L 3.2929688 13.707031 L 9 19.414062 L 21.707031 6.7070312 L 20.292969 5.2929688 z" />
          </svg>
        </button>
        <div className='buttons-wrapper'>
          <button
            className='main-buttons'
            onClick={toggleHighlighting}
            disabled={isBtnDisabled}>
            {inspectMode ? 'Active Inspect ' : ' Inspect '}
            <svg fill="#000000" height="30px" width="30px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 183.792 183.792">
              <path d="M54.734,9.053C39.12,18.067,27.95,32.624,23.284,50.039c-4.667,17.415-2.271,35.606,6.743,51.22
            c12.023,20.823,34.441,33.759,58.508,33.759c7.599,0,15.139-1.308,22.287-3.818l30.364,52.592l21.65-12.5l-30.359-52.583
            c10.255-8.774,17.638-20.411,21.207-33.73c4.666-17.415,2.27-35.605-6.744-51.22C134.918,12.936,112.499,0,88.433,0
            C76.645,0,64.992,3.13,54.734,9.053z M125.29,46.259c5.676,9.831,7.184,21.285,4.246,32.25c-2.938,10.965-9.971,20.13-19.802,25.806
            c-6.462,3.731-13.793,5.703-21.199,5.703c-15.163,0-29.286-8.146-36.857-21.259c-5.676-9.831-7.184-21.284-4.245-32.25
            c2.938-10.965,9.971-20.13,19.802-25.807C73.696,26.972,81.027,25,88.433,25C103.597,25,117.719,33.146,125.29,46.259z"/>
            </svg>
          </button>
          <button
            className='main-buttons'
            onClick={toggleArresting}
            disabled={isBtnDisabled}>
            {arrestMode ? 'Active Arrest ' : ' Arrest '}
            <svg version="1.1" id="Uploaded to svgrepo.com" xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 32 32" >
              <path d="M26.657,15.626L26,13h-1.039c-0.198-2.827-1.892-5.224-4.552-6.326
              c-2.537-1.051-5.286-0.656-7.41,1.01l-0.756-0.756L9.923,8.321C9.319,8.116,8.674,8,8,8c-3.314,0-6,2.686-6,6s2.686,6,6,6
              s6-2.686,6-6c0-0.674-0.116-1.319-0.321-1.923l1.392-2.32l-0.654-0.654c1.76-1.273,3.796-1.173,5.226-0.581
              c1.507,0.624,3.092,2.123,3.313,4.478H22l-0.657,2.626C19.364,16.607,18,18.641,18,21c0,3.314,2.686,6,6,6s6-2.686,6-6
              C30,18.641,28.636,16.607,26.657,15.626z M8,18c-2.206,0-4-1.794-4-4s1.794-4,4-4c2.206,0,4,1.794,4,4S10.206,18,8,18z M24,25
              c-2.206,0-4-1.794-4-4s1.794-4,4-4c2.206,0,4,1.794,4,4S26.206,25,24,25z"/>
            </svg>
          </button>
          <button
            className='main-buttons'
            onClick={() => handleNextTurn()}>
            Next day
            <svg fill="#000000" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512.001 512.001">
              <g>
                <g>
                  <path d="M512.001,256.001L283.126,87.357V215.15H0v81.7h283.126v127.793L512.001,256.001z M16.363,280.488v-48.975h283.126
                V119.738l184.926,136.263L299.489,392.263V280.488H16.363z"/>
                </g>
              </g>
              <g>
                <g>
                  <rect x="375.662" y="151.437" transform="matrix(0.5735 -0.8192 0.8192 0.5735 -14.7941 407.3793)" width="16.362" height="132.921" />
                </g>
              </g>
            </svg>
          </button>
        </div>
        <InspectModalBox
          show={modalVisible}
          onClose={handleModalClick}
          onRestart={restartGame}
          highlightedCards={highlightedCards}
        />
        <EndGameModalBox
          message={`You lose the game! Killer was ${killer?.name}`}
          onRestart={restartGame}
          isOpen={isModalOpen}
        />
        <RulesModalBox></RulesModalBox>
      </section>
    </>
  );
};

export default Grid;