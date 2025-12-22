import express from "express";
import {
  getBookingDetails,
  getCheckoutSession,
  getUserBooking,
  verifyPymentAndCreateBooking,
} from "../controllers/bookingController.js";
import { protect } from "../controllers/authController.js";

const bookingRouter = express.Router();

// get all the bookings
bookingRouter.get("/", protect, getUserBooking);

// get details of specific booking using bookingId
bookingRouter.get("/:bookingId", protect, getBookingDetails);

// checkout session for razorpay
bookingRouter.post("/checkout-session", protect, getCheckoutSession);

// create bookings
bookingRouter
  .route("/verify-payment")
  .post(protect, verifyPymentAndCreateBooking);

export { bookingRouter };
