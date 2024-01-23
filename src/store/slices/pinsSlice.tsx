import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PinType } from "../../components/types";
type Pins = {
  [key: string]: PinType;
}
interface PinsState {
  pins: Pins;
  allIds: string[];
  searchResult: PinType[];
  searchQuery: string;
}

const initialState: PinsState = {
  pins: {},
  allIds: [],
  searchResult: [],
  searchQuery: "",
};

export const pinsSlice = createSlice({
  name: "pins",
  initialState,
  reducers: {
    setPins: (state, action: PayloadAction<{ pins: Pins, allIds: string[]}>) => {
      state.pins = action.payload.pins;
      state.allIds = action.payload.allIds;
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
export const selectPinsIds = (state: PinsState) => state.pins.allIds;
export const selectSearchResult = (state: PinsState) => state.pins.searchResult;
export const selectSearchQuery = (state: PinsState) => state.pins.searchQuery;

export default pinsSlice.reducer;
