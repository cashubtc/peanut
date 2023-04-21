import { configureStore } from '@reduxjs/toolkit';
import proofReducer from '../features/proofs/proofSlice';
import listener from './listenerMiddleware';

export const store = configureStore({
  reducer: {
    proof: proofReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listener.middleware),
});
