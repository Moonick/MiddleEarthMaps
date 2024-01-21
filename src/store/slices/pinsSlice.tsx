
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PinType } from '../../components/types';

interface PinsState {
  pins: PinType[];
}

const initialState: PinsState = {
  pins: [],
};

export const pinsSlice = createSlice({
  name: 'pins',
  initialState,
  reducers: {
    setPins: (state, action: PayloadAction<PinType[]>) => {
      state.pins = action.payload;
    },
  },
});

export const { setPins } = pinsSlice.actions;
export const selectPins = (state: PinsState) => state.pins;

export default pinsSlice.reducer;
