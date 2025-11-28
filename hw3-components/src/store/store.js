import { configureStore } from '@reduxjs/toolkit';
import charactersReducer from '../features/characters/charactersSlice';

export const store = configureStore({
  reducer: {
    characters: charactersReducer,
  },
});

export default store;
