import { configureStore } from '@reduxjs/toolkit';
import proofReducer from './features/proofs/proofSlice';

export const store = configureStore({
  reducer: {
    proof: proofReducer,
  },
});
