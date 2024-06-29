import { type RootState } from "../";
import type { UserState } from "./types";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: UserState = {
  registered: false,
  backpack: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: () => initialState,
    set: (
      state,
      action: PayloadAction<Pick<UserState, "name" | "password">>,
    ) => ({
      ...state,
      name: action.payload.name,
      password: action.payload.password,
    }),
    register: (state) => ({ ...state, registered: true }),
    setBackpack: (state, action: PayloadAction<string[]>) => ({
      ...state,
      backpack: action.payload,
    }),
  },
});

export const { reset, set, register, setBackpack } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
