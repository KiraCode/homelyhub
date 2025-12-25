import Razorpay from "razorpay";
import { Property } from "../models/propertyModel.js";
import crypto from "crypto";
import moment from "moment";
import { Booking } from "../models/bookingModel.js";

const razorPay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// Step 1: Create a razorpay order(before booking creation)
const getCheckoutSession = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ status: "fail", message: "Please login first" });
    }
    const { amount, currency, propertyId, fromDate, toDate, guests } = req.body;

    // validate the dates and availability before creating the order
    const property = await Property.findById(propertyId);
    if (!property) {
      return res
        .status(404)
        .json({ status: "fail", message: "Property Not Found" });
    }

    // check availability
    const isBooked = property.currentBookings.some((booking) => {
      return (
        (booking.fromDate <= new Date(fromDate) &&
          new Date(fromDate <= booking.toDate)) ||
        (booking.fromDate <= new Date(toDate) &&
          new Date(toDate) <= booking.fromDate)
      );
    });

    if (isBooked) {
      return res.status(400).json({
        status: "fail",
        message: "Property is already booked for the requested dates",
      });
    }

    const options = {
      amount: amount * 100,
      currency: currency || "INR",
      receipt: `booking_${Date.now()}_${req.user.name}`,
      notes: {
        propertyId,
        propertyName: property.propertyName,
        userId: req.user._id.toString(),
        fromDate,
        toDate,
        guests: guests.toString(),
      },
    };

    const order = await Razorpay.orders.create(options);
    console.log("Orders", order);

    res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
      propertyName: property.propertyName,
    });
  } catch (error) {
    console.error("Checkout session Error" + error);
    res.status(500).json({
      success: false,
      message: "Failed to create Razorpay order",
      error: error.message,
    });
  }
};

// step 2: verify payment and Create booking
const verifyPymentAndCreateBooking = async (req, res) => {
  try {
    const { razorpayData, bookingDetails } = req.body;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      razorpayData;

    //   verify payment signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        status: "fail",
        message: "Payment Verification failed",
      });
    }

    const payment = await razorPay.payments.fetch(razorpay_payment_id);
    if (payment.status !== "captured") {
      return res.status(400).json({
        statu: "fail",
        message: "Payment Verification failed",
      });
    }

    //   extract booking details from payment notes or request body
    const { propertyId, fromDate, toDate, guests, totalAmount } =
      bookingDetails;

    const fromDateMoment = moment(fromDate);
    const toDateMoment = moment(toDate);

    const numberOfnights = todateMoment.diff(fromDateMoment, "days");

    //   create booking with payment details
    const booking = await Booking.create({
      property: propertyId,
      price: totalAmount,
      guests,
      fromDate,
      toDate,
      numberOfnights,
      user: req.user._id,
      paymentStatus: "completed",
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      paidAt: new Date(),
    });

    // push the booking data inside the property's currentbooking
    const updateProperty = await Property.findByIdAndUpdate(propertyId, {
      $push: {
        currentBookings: {
          bookingId: booking._id,
          fromDate,
          toDate,
          userId: req.user._id,
        },
      },
    });

    res.status(200).json({
      status: "success",
      message: "Booking Created Successfully",
      data: {
        booking,
        paymentId: razorpay_payment_id,
      },
    });
  } catch (error) {
    console.error("Booking creation error", error);
    res.status(500).json({
      status: "fail",
      message: "Failed to create booking",
      error: error.message,
    });
  }
};

// Booking of a particular user
const getUserBooking = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id });
    res.status(200).json({ status: "Success", data: { bookings } });
  } catch (error) {
    res.status(401).json({ status: "fail", message: error.message });
  }
};

// Booking Details by bookingId
const getBookingDetails = async (req, res) => {
  try {
    const bookings = await Booking.findById(req.params.bookingId);
    res.status(200).json({ status: "Success", data: { bookings } });
  } catch (error) {
    res.status(401).json({
      status: "fail",
      message: error.message,
    });
  }
};

export {
  getBookingDetails,
  getCheckoutSession,
  getUserBooking,
  verifyPymentAndCreateBooking,
};
