import axios from "axios";
import { axiosInstance } from "../../utils/axios";

import { setBookingDetails, setBookings } from "./bookingSlice";

export const fetchBookingDetails = (bookingId) => async (dispatch) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/rent/user/booking/${bookingId}`
    );
    if (!response) throw new Error("failed to get the bookng details");

    dispatch(setBookingDetails(response.data.data));
  } catch (error) {
    console.error(error.response?.data?.message || error.message);
  }
};

export const fetchUserBookings = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get("/api/v1/rent/user/booking");
    if (!response) throw new Error("failed to fetch bookings");
    dispatch(setBookings(response.data.data.bookings));
  } catch (error) {
    console.error(error.response?.data?.message || error.message);
  }
};
