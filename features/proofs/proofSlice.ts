import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type SerializedProof = {
  id: string;
  secret: string;
  amount: number;
  C: string
};

interface ProofSlice {
  proofs: SerializedProof[],
  proofIds: string[]
}

const initialState: ProofSlice = {
  proofs: [],
  proofIds: [],
};

export const proofSlice = createSlice({
  name: 'proof',
  initialState,
  reducers: {
    addProofs: (state, action: PayloadAction<SerializedProof[]>) => {
      const newProofs = action.payload;
      state.proofs = [...state.proofs, ...newProofs];
    },
    removeProofs: (state, action: PayloadAction<SerializedProof[]>) => {
      const toBeRemoved = action.payload;
      const toBeRemovedCs = toBeRemoved.map((proof) => proof.C);
      state.proofs = state.proofs.filter(
        (proof) => !toBeRemovedCs.includes(proof.C),
      );
    },
    hydrateProofs: (state, action: PayloadAction<SerializedProof[]>) => {
      const newProofs = action.payload;
      state.proofs = [...state.proofs, ...newProofs];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addProofs, removeProofs, hydrateProofs } = proofSlice.actions;

export default proofSlice.reducer;
