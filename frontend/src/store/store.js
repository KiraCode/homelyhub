import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Users/user-slice.js";
import propertySlice from "./Property/property-slice.js";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    properties:propertySlice.reducer
  },
});

export default store;
