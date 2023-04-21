import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { Proof } from '@cashu/cashu-ts';

type serializedProof = {
  id: string;
  secret: string;
  amount: number;
  C: string
}

interface ProofSlice {
  proofs: serializedProof[],
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
    addProofs: (state, action: PayloadAction<serializedProof[]>) => {
      const newProofs = action.payload;
      state.proofs = [...state.proofs, ...newProofs];
    },
    removeProofs: (state, action: PayloadAction<serializedProof[]>) => {
      const toBeRemoved = action.payload;
      const toBeRemovedCs = toBeRemoved.map((proof) => proof.C);
      state.proofs = state.proofs.filter(
        (proof) => !toBeRemovedCs.includes(proof.C),
      );
    },
    hydrateProofs: (state, action: PayloadAction<serializedProof[]>) => {
      const newProofs = action.payload;
      state.proofs = [...state.proofs, ...newProofs];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addProofs, removeProofs, hydrateProofs } = proofSlice.actions;

export default proofSlice.reducer;
