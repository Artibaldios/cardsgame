import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { iCard } from "../types/interfaces";
import { initialCards } from '../initialData/data';
import {
	moveCardsRight,
	moveCardsLeft,
	moveCardsUp,
	moveCardsDown,
	findNeighbors,
	findKillerCardPosition,
	killRandomCard
} from '../utils/helpers';

const cardsSlice = createSlice({
	name: 'cards',
	initialState: {
		cards: initialCards,
		highlightedCards: [] as iCard[],
		killer: [] as iCard[],
		inspectMode: false,
		arrestMode: false,
	},
	reducers: {
		setCards(state, action: PayloadAction<iCard[]>) {
			state.cards = action.payload;
		},
		setInspectModeFalse(state) {
			state.inspectMode = false;
		},
		setInspectModeTrue(state) {
			state.inspectMode = true;
		},
		setArrestModeTrue(state) {
			state.arrestMode = true;
		},
		setArrestModeFalse(state) {
			state.arrestMode = false;
		},
		setRandomCardKiller(state) {
			const randomIndex = Math.floor(Math.random() * state.cards.length);
			state.cards = state.cards.map((card, index) => ({
				...card,
				status: index === randomIndex ? "killer" : card.status,
			}));
			state.killer = state.cards.filter(card => card.status === "killer");
		},
		handleKill(state) {
			const killerPosition = findKillerCardPosition(state.cards);
			const neighborsArray = findNeighbors(killerPosition, state.cards);
			state.cards = killRandomCard(state.cards, neighborsArray);
		},
		moveCardsRightInGrid(state, action: PayloadAction<number>) {
			state.cards = moveCardsRight(state.cards, action.payload);
		},
		moveCardsLeftInGrid(state, action: PayloadAction<number>) {
			state.cards = moveCardsLeft(state.cards, action.payload);
		},
		moveCardsUpInGrid(state, action: PayloadAction<number>) {
			state.cards = moveCardsUp(state.cards, action.payload);
		},
		moveCardsDownInGrid(state, action: PayloadAction<number>) {
			state.cards = moveCardsDown(state.cards, action.payload);
		},
		handleMove(state) {
			const movingFunctionsArray = [moveCardsRight, moveCardsLeft, moveCardsUp, moveCardsDown];
			const randomIndex = Math.floor(Math.random() * movingFunctionsArray.length);
			const selectedFunction = movingFunctionsArray[randomIndex];
			state.cards = selectedFunction(state.cards, randomIndex); // Apply the selected movement function
		},
		highlightCard(state, action: PayloadAction<{ rowIndex: number; columnIndex: number }>) {
			const { rowIndex, columnIndex } = action.payload;
			const newCards = state.cards.map(card => ({
				...card,
				highlightColor: "", // Reset highlight color
				highlighted: false, // Reset highlighted state
			}));
			const cardIndex = rowIndex * 4 + columnIndex;
			if (newCards[cardIndex]) {
				newCards[cardIndex].highlighted = true;
				newCards[cardIndex].highlightColor = "orange";
			}
			state.cards = newCards;
			// Update highlightedCards with currently highlighted cards
			state.highlightedCards = newCards.filter(card => card.highlighted);
		},
		handleHighlightingOFF(state) {
			const newCards = state.cards.map(card => ({
				...card,
				highlightColor: "",
				highlighted: false,
			}));
			state.cards = newCards;
			state.highlightedCards = [];
    },
		highlightCards2x2(state, action: PayloadAction<{ row: number; col: number }>) {
			const { row, col } = action.payload;
			const newCards = state.cards.map(card => ({
				...card,
				highlightColor: "",
				highlighted: false,
			}));
			for (let i = row; i < row + 2; i++) {
				for (let j = col; j < col + 2; j++) {
					if (i < 4 && j < 4) {
						const index = i * 4 + j;
						newCards[index].highlighted = true;
						newCards[index].highlightColor = "orange";
					}
				}
			}
			state.cards = newCards;
			state.highlightedCards = newCards.filter(card => card.highlighted);
		},
	},
});

export const {
	setCards,
	setInspectModeFalse,
	setInspectModeTrue,
	setArrestModeTrue,
	setArrestModeFalse,
	setRandomCardKiller,
	handleKill,
	moveCardsRightInGrid,
	moveCardsLeftInGrid,
	moveCardsUpInGrid,
	moveCardsDownInGrid,
	handleMove,
	highlightCard,
	highlightCards2x2,
	handleHighlightingOFF
} = cardsSlice.actions;

export default cardsSlice.reducer;