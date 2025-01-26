import { configureStore } from '@reduxjs/toolkit';
import cardsReducer from './slices/cardSlice';

const store = configureStore({
    reducer: {
        cards: cardsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;