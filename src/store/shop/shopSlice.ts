import { type RootState } from "../";
import type { ShopState, Item } from "./types";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: ShopState = {
  items: [],
};

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    reset: () => initialState,
    set: (state, action: PayloadAction<Item[]>) => {
      return {
        ...state,
        items: action.payload,
      };
    },
  },
});

export const { reset, set } = shopSlice.actions;

export const selectShopItems = (state: RootState) => state.shop.items;

export default shopSlice.reducer;
