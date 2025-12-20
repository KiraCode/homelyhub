import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Users/user-slice.js";
import propertySlice from "./Property/property-slice.js";
import propertyDetailsSlice from "./PropertyDetails/propertyDetails-slice.js";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    properties: propertySlice.reducer,
    propertyDetails: propertyDetailsSlice.reducer,
  },
});

export default store;
