import { iCard } from "../types/interfaces";

// Function to move all cards in a specific row to the right
export const moveCardsRight = (cards: iCard[], rowIndex: number): iCard[] => {
  const rowCards = cards.filter(card => card.row === rowIndex);
  if (rowCards.length === 0) {
    return cards;
  }
  const newRowCards = [...rowCards];
  const lastCard = newRowCards.pop();
  if (lastCard) {
    newRowCards.unshift(lastCard);
  }
  return cards.map(card => {
    if (card.row === rowIndex) {
      const newCol = (card.col) % 4;
      if (newCol === 0 && lastCard && card.id === lastCard.id) {
        return { ...lastCard, row: rowIndex, col: 3 };
      }
      return { ...newRowCards.shift()!, row: rowIndex, col: newCol };
    }
    return card;
  });
};

// Function to move all cards in a specific row to the left
export const moveCardsLeft = (cards: iCard[], rowIndex: number): iCard[] => {
  const rowCards = cards.filter(card => card.row === rowIndex);
  if (rowCards.length === 0) {
    return cards;
  }

  const newRowCards = [...rowCards];
  const firstCard = newRowCards.shift();
  if (firstCard) {
    newRowCards.push(firstCard);
  }
  return cards.map(card => {
    if (card.row === rowIndex) {
      const newCol = (card.col) % 4;
      return { ...newRowCards.shift()!, row: rowIndex, col: newCol };
    }
    return card;
  });
};

// Function to move all cards in a specific column up
export const moveCardsUp = (cards: iCard[], colIndex: number): iCard[] => {
  const columnCards = cards.filter(card => card.col === colIndex);
  if (columnCards.length === 0) {
    return cards;
  }

  const newColumnCards = [...columnCards];
  const firstCard = newColumnCards.shift();
  if (firstCard) {
    newColumnCards.push(firstCard);
  }

  return cards.map(card => {
    if (card.col === colIndex) {
      const newRow = (card.row) % 4;
      return { ...newColumnCards.shift()!, row: newRow, col: colIndex };
    }
    return card;
  });
};

// Function to move all cards in a specific column down
export const moveCardsDown = (cards: iCard[], colIndex: number): iCard[] => {
  const columnCards = cards.filter(card => card.col === colIndex);
  if (columnCards.length === 0) {
    return cards;
  }

  const newColumnCards = [...columnCards];
  const lastCard = newColumnCards.pop();
  if (lastCard) {
    newColumnCards.unshift(lastCard);
  }

  return cards.map(card => {
    if (card.col === colIndex) {
      const newRow = (card.row) % 4;
      return { ...newColumnCards.shift()!, row: newRow, col: colIndex };
    }
    return card;
  });
};

export const findNeighbors = (position: any, cards: iCard[]): number[] => {
  const neighbors: number[] = [];
  const { row, col } = position;
  const directions = [
    { row: -1, col: 0 },   // Above
    { row: 1, col: 0 },    // Below
    { row: 0, col: -1 },   // Left
    { row: 0, col: 1 },    // Right
    { row: -1, col: -1 },  // Top-left diagonal
    { row: -1, col: 1 },   // Top-right diagonal
    { row: 1, col: -1 },   // Bottom-left diagonal
    { row: 1, col: 1 }     // Bottom-right diagonal
  ];

  directions.forEach(({ row: dRow, col: dCol }) => {
    const newRow = row + dRow;
    const newCol = col + dCol;
    if (newRow >= 0 && newRow < 4 && newCol >= 0 && newCol < 4) {
      const neighborCard = cards.find(card => card.row === newRow && card.col === newCol);
      if (neighborCard) {
        neighbors.push(neighborCard.id);
      }
    }
  });
  return neighbors;
};

export const findKillerCardPosition = (cards: iCard[]) => {
  for (const card of cards) {
    if (card.status === "killer") {
      return { row: card.row, col: card.col };
    }
  }
};

export const killRandomCard = (cards: iCard[], neighborsArray: number[]): iCard[] => {
  const eligibleCards = cards.filter(card =>
    neighborsArray.includes(card.id) && card.live && card.status !== "killer"
  );

  if (eligibleCards.length === 0) {
    console.warn("No eligible cards to kill.");
    return cards;
  }

  const randomIndex = Math.floor(Math.random() * eligibleCards.length);
  const selectedCardId = eligibleCards[randomIndex];
  return cards.map(card => {
    if (card.row === selectedCardId.row && card.col === selectedCardId.col) {
      return { ...card, live: false };
    }
    return card;
  });
};

