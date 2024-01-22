import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PinType } from "../../components/types";

interface PinsState {
  pins: PinType[];
  searchResult: PinType[];
  searchQuery: string;
}

const initialState: PinsState = {
  pins: [],
  searchResult: [],
  searchQuery: "",
};

export const pinsSlice = createSlice({
  name: "pins",
  initialState,
  reducers: {
    setPins: (state, action: PayloadAction<PinType[]>) => {
      state.pins = action.payload;
    },
    setSearchResult: (state, action: PayloadAction<PinType[]>) => {
      state.searchResult = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setPins, setSearchResult, setSearchQuery } = pinsSlice.actions;
export const selectPins = (state: PinsState) => state.pins.pins;
export const selectSearchResult = (state: PinsState) => state.pins.searchResult;
export const selectSearchQuery = (state: PinsState) => state.pins.searchQuery;

export default pinsSlice.reducer;
