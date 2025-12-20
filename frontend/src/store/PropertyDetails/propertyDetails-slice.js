import { createSlice } from "@reduxjs/toolkit";

const propertyDetailsSlice = createSlice({
  name: "propertydetails",
  initialState: {
    propertyDetails: null,
    loading: false,
    error: null,
  },
  reducers: {
    setListRequest(state) {
      state.loading = true;
    },
    getPropertyDetails(state, action) {
      state.propertyDetails = action.payload;
      state.loading = false;
    },
    getErrors(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const propertyDetailsAction = propertyDetailsSlice.actions;
export default propertyDetailsSlice;
