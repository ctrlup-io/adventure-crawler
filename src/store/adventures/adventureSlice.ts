import { type RootState } from "..";
import type { Adventure, AdventureState } from "./types";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: AdventureState = [];

export const adventuresSlice = createSlice({
  name: "adventures",
  initialState,
  reducers: {
    reset: () => initialState,
    set: (_state, action: PayloadAction<Adventure[]>) => action.payload,
  },
});

export const { reset, set } = adventuresSlice.actions;

export const selectAdventures = (state: RootState) => state.adventures;

export default adventuresSlice.reducer;
