import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import {
	setCards,
	setInspectModeTrue,
	setInspectModeFalse,
	setArrestModeTrue,
	setArrestModeFalse,
	setRandomCardKiller,
	handleKill,
	handleMove,
	highlightCard,
	highlightCards2x2,
	handleHighlightingOFF
} from '../../slices/cardSlice'
import Card from "../Card/Card";
import InspectModalBox from '../Modals/InspectModalBox/Modal';
import EndGameModalBox from '../Modals/EndGameModalBox/EndGameModalBox';
import RulesModalBox from '../Modals/RulesModalBox/RulesModalBox';
import { initialCards } from '../../initialData/data';
const MobileGrid: React.FC = () => {
	const [checkBtnDisabled, setCheckBtnDisabled] = useState(false);
	const [lastTouchedCardId, setLastTouchedCardId] = useState<number | null>(null);
	const [modalVisible, setModalVisible] = useState(false);
	const [isModalEndOpen, setIsModalEndOpen] = useState(false);
	const [countLiveFalse, setCountLiveFalse] = useState<number>(0);
	const [isVisible, setIsVisible] = useState(true);
	const dispatch = useDispatch();
	const { cards, inspectMode, arrestMode, highlightedCards, killer } = useSelector((state: RootState) => state.cards);

	useEffect(() => {
		dispatch(setRandomCardKiller());
	}, [dispatch]);

	useEffect(() => {
		setCountLiveFalse(cards.filter(card => card.live === false).length);
	}, [cards]);

	const handleArrestClick = () => {
		dispatch(setArrestModeTrue());
	};

	const handleCardTouch = (rowIndex: number, columnIndex: number) => {
		if (arrestMode) {
			dispatch(highlightCard({ rowIndex, columnIndex }));
		}
	};

	const handleTouch = (id: number, row: number, col: number) => {
		// arrest logic
		if (arrestMode && lastTouchedCardId !== id) {
			handleCardTouch(row, col);
			setLastTouchedCardId(id);
		}
		// inspect logic
		if (inspectMode && lastTouchedCardId !== id) {
			dispatch(handleHighlightingOFF());
			dispatch(highlightCards2x2({ row, col }));
			setLastTouchedCardId(id);
			console.log(highlightedCards)
		}
	};

	const handleCheckTouch = () => {
		if (arrestMode || inspectMode) {
			handleCheck();
			setCheckBtnDisabled(true);
		}
	};

	const handleCheck = () => {
		//if (!arrestMode || !inspectMode) return;
		console.log(arrestMode, inspectMode, highlightedCards)
		if (highlightedCards.length > 0) {
			setModalVisible(true);
			console.log(highlightedCards)
		} else {
			alert('No cards are highlighted.');
		}
	};

	const handleModalClick = () => {
		setModalVisible(false);
	}

	const restartGame = () => {
		dispatch(setCards(initialCards));
		setCountLiveFalse(0);
		setIsModalEndOpen(false);
		setModalVisible(false);
		dispatch(setInspectModeFalse());
		dispatch(setArrestModeFalse());
		setCheckBtnDisabled(false);
		dispatch(setRandomCardKiller());
	};

	const handleNextTurn = () => {
		setIsVisible(false);
		setTimeout(() => {
			setCheckBtnDisabled(false);
			dispatch(handleKill());
			dispatch(handleMove());
			dispatch(setInspectModeFalse());
			dispatch(setArrestModeFalse());
			dispatch(handleHighlightingOFF());
			setIsVisible(true);
			if (countLiveFalse && countLiveFalse >= 4) {
				setIsModalEndOpen(true);
			}
		}, 1000);
	};

	return (
		<section className="main-grid-elements">
			<div className='killed-info'>
				<h1 >Days left: {` ${5 - countLiveFalse}`}</h1>
			</div>
			<div
				className={`grid content ${isVisible ? 'visible' : 'hidden'}`}
			>
				{cards.map((card) => (
					<Card
						key={card.id}
						card={card}
						handleTouch={() => handleTouch(card.id, card.row, card.col)}
					></Card>
				))}
			</div>
			<button
				className='main-buttons touch-button'
				onClick={handleCheckTouch}
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
					onClick={() => dispatch(setInspectModeTrue())}
					disabled={inspectMode || arrestMode}
				>
					{inspectMode ? 'Active Inspect ' : 'Inspect '}
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
					onClick={handleArrestClick}
					disabled={inspectMode || arrestMode}
				>
					{arrestMode ? 'Active Arrest' : 'Arrest '}
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
					onClick={handleNextTurn}
					className='main-buttons'
				>
					Next Turn
					<svg fill="#000000" width="25px" height="25px" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg">
						<g id="_x37_05-_play__x2C__play_button__x2C__media_x2C_">
							<g>
								<g>
									<path d="M53.745,492.847c-1.167,0-2.335-0.305-3.378-0.912c-2.062-1.202-3.33-3.409-3.33-5.796V26.814     c0-2.387,1.269-4.594,3.331-5.796c2.062-1.203,4.608-1.217,6.685-0.041l405.459,229.696c2.103,1.191,3.401,3.421,3.401,5.837     c0,2.417-1.3,4.646-3.402,5.837L57.051,491.976C56.025,492.557,54.885,492.847,53.745,492.847z M60.454,38.325V474.63     l385.139-218.12L60.454,38.325z" />
								</g>
							</g>
						</g>
						<g id="Layer_1" />
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
				message={`You lose the game! Killer was ${killer.length > 0 ? killer[0].name : ""}`}
				onRestart={restartGame}
				isOpen={isModalEndOpen}
			/>
			<RulesModalBox></RulesModalBox>
		</section>
	);
};

export default MobileGrid;