import { paymentActions } from "./payment-slice.js";
import { axiosInstance } from "../../utils/axios.js";

// 1. checkout session creator
export const initiateCheckoutSession = (paymentData) => async (dispatch) => {
  try {
    dispatch(paymentActions.getCheckoutRequest());
    const response = await axiosInstance.post(
      "/api/v1/rent/user/booking/checkout-session",
      paymentData
    );

    if (!response) throw new Error("Failed to initiate checkout session");
    dispatch(paymentActions.getCheckoutSuccess(response.data));
  } catch (error) {
    dispatch(
      paymentActions.getError(error.response?.data?.message || error.message)
    );
  }
};

// 2. payment verified
export const verifyPayment = (verifyData) => async (dispatch) => {
  try {
    dispatch(paymentActions.getVerifyRequest());
    const response = await axiosInstance.post(
      "/api/v1/rent/user/booking/verify-payment",
      verifyData
    );

    if (!response) throw new Error("failed to verify payment");
    dispatch(paymentActions.getVerifySuccess(response.data));
  } catch (error) {
    dispatch(
      paymentActions.getError(error.response?.data?.message || error.message)
    );
  }
};
