import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Users/user-slice.js";
import propertySlice from "./Property/property-slice.js";
import propertyDetailsSlice from "./PropertyDetails/propertyDetails-slice.js";
import paymentSlice from "./Payment/payment-slice.js";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    properties: propertySlice.reducer,
    propertyDetails: propertyDetailsSlice.reducer,
    payment: paymentSlice.reducer,
  },
});

export default store;
