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
  },
});

// Action creators are generated for each case reducer function
export const { addProofs } = proofSlice.actions;

export default proofSlice.reducer;
