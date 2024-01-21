import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LocationType } from "../../components/types";

interface UserLocationState {
  location: LocationType;
}

const initialState: UserLocationState = {
  location: null,
};

const userLocationSlice = createSlice({
  name: "userLocation",
  initialState,
  reducers: {
    setUserLocation: (state: UserLocationState, action: PayloadAction<LocationType>) => {
      state.location = action.payload;
    },
  },
});

export const { setUserLocation } = userLocationSlice.actions;

export const selectUserLocation = (state: UserLocationState) => state.location;
export default userLocationSlice.reducer;
