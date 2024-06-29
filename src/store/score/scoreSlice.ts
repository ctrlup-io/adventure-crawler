import { type RootState } from "../";
import type { ScoreState } from "./types";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: ScoreState = {
  rows: [],
};

export const scoreSlice = createSlice({
  name: "score",
  initialState,
  reducers: {
    reset: () => initialState,
    set: (state, action: PayloadAction<ScoreState>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { reset, set } = scoreSlice.actions;

export const selectScore = (state: RootState) => state.score;

export const selectUserScore = (state: RootState) =>
  state.score.rows.find((row) => row.name === state.user.name)?.score;

export default scoreSlice.reducer;
