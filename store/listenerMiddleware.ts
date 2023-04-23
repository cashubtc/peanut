import { createListenerMiddleware } from '@reduxjs/toolkit';
import { addProofs, removeProofs } from '../features/proofs/proofSlice';
import { addProofToDatabase, deleteProofsFromDb } from '../utils/database';

const listener = createListenerMiddleware();
listener.startListening({
  actionCreator: addProofs,
  effect: async (action) => {
    await Promise.all(action.payload.map((obj) => addProofToDatabase(obj)));
  },
});
listener.startListening({
  actionCreator: removeProofs,
  effect: async (action) => {
    const toBeRemovedCs = action.payload.map((proof) => proof.C);
    deleteProofsFromDb(toBeRemovedCs);
  },
});

export default listener;
