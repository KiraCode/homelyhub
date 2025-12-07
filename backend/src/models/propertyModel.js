import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  propertyName: {
    type: String,
    required: [true, "Please add information about your property"],
  },
  extraInfo: {
    type: String,
    default:
      "Nestled in a tranquil neighborhood, the house exudes an aura of charm and elegance. The exterior is adorned with a harmonious blend of classic and contemporary architectural elements, featuring a beautiful brick facade and a welcoming front porch.As you step inside, you are greeted by a spacious, sunlit living room with high ceilings and large windows that invite an abundance of natural light. The hardwood floors add a touch of warmth to the space, complementing the neutral color palette.The kitchen is a chef's dream, equipped with modern appliances, sleek countertops, and ample storage space. It opens up to a cozy dining area, creating a perfect setting for family meals and gatherings.",
  },
  propertyType: {
    type: String,
    enum: ["House", "Flat", "Guest House", "Hotel"],
    default: "House",
  },
  roomType: {
    type: String,
    enum: ["Anytype", "Room", "Entire Home"],
    default: "AnyType",
  },
  maximumGuest: {
    type: Number,
    required: [true, "Please give the maximum no of Guest that can occupy"],
  },
  amenities: [
    {
      name: {
        type: String,
        required: true,
        enum: [
          "Wifi",
          "Kitchen",
          "AC",
          "Washing Machine",
          "Tv",
          "Pool",
          "Free Parking",
        ],
      },
      icon: {
        type: String,
        require: true,
      },
    },
  ],
  images: {
    type: [
      { public_id: { type: String }, url: { type: String, required: true } },
    ],
    validate: {
      validator: function (arr) {
        return arr.length >= 6;
      },
      message: "The images must contain atleast 6 images",
    },
  },
  price: {
    type: Number,
    required: [true, "Please enter the price per night value"],
  },
  address: {
    area: String,
    city: String,
    state: String,
    pincode: Number,
  },
  currentBookings: [
    {
      bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
      },
      fromDate: Date,
      toDate: Date,
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  userId: {
    // who created the property
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  checkInTime: { type: String, default: "13:00" },
  checkOutTime: { type: String, default: "11:00" },
});

propertySchema.pre("save", function (next) {
  this.address.city = this.address.city.toLowerCase().replace(" ", "");
  next();
});

const Property = mongoose.model("Property", propertySchema);
export { Property };
