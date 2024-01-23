import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LocationType, StateType, UserLocationState } from "../../components/types";

const initialState: UserLocationState = {
  location: null,
};

const userLocationSlice = createSlice({
  name: "userLocationState",
  initialState,
  reducers: {
    setUserLocation: (state: UserLocationState, action: PayloadAction<LocationType>) => {
      state.location = action.payload;
    },
  },
});

export const { setUserLocation } = userLocationSlice.actions;

export const selectUserLocation = (state: StateType) => state.userLocationState.location;
export default userLocationSlice.reducer;
