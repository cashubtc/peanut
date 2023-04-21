import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  proofs: [],
  proofIds: [],
};

export const proofSlice = createSlice({
  name: 'proof',
  initialState,
  reducers: {
    addProofs: (state, action) => {
      const newProofs = action.payload;
      state.proofs = [...state.proofs, ...newProofs];
    },
    removeProofs: (state, action) => {
      const toBeRemoved = action.payload;
      const toBeRemovedCs = toBeRemoved.map((proof) => proof.C);
      state.proofs = state.proofs.filter(
        (proof) => !toBeRemovedCs.includes(proof.C),
      );
    },
    hydrateProofs: (state, action) => {
      const newProofs = action.payload;
      state.proofs = [...state.proofs, ...newProofs];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addProofs, removeProofs, hydrateProofs } = proofSlice.actions;

export default proofSlice.reducer;
