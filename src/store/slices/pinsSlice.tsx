import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pins, PinsState, PinType, StateType } from "../../components/types";

const initialState: PinsState = {
  pins: {},
  allIds: [],
  searchResult: [],
  searchQuery: "",
};

export const pinsSlice = createSlice({
  name: "pinsState",
  initialState,
  reducers: {
    setPins: (state: PinsState, action: PayloadAction<{ pins: Pins; allIds: string[] }>) => {
      state.pins = action.payload.pins;
      state.allIds = action.payload.allIds;
    },
    setSearchResult: (state: PinsState, action: PayloadAction<PinType[]>) => {
      state.searchResult = action.payload;
    },
    setSearchQuery: (state: PinsState, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setPins, setSearchResult, setSearchQuery } = pinsSlice.actions;
export const selectPins = (state: StateType) => state.pinsState.pins;
export const selectPinsIds = (state: StateType) => state.pinsState.allIds;
export const selectSearchResult = (state: StateType) => state.pinsState.searchResult;
export const selectSearchQuery = (state: StateType) => state.pinsState.searchQuery;

export default pinsSlice.reducer;
