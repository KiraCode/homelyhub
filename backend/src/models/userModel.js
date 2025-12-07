import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Please enter your name"] },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please enter a valid email Id"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minlength: [6, "Your password must be longer then 6 characters"],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Password didn't matched",
      },
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      url: String,
      public_id: { type: String },
    },
    passwordChangedAt: {
      type: Date,
    },
    passwordResetTokem: String,
    passwordResetExpires: Date,
  },
  { timestamps: true }
);

// documment middleware
userSchema.pre("save", async function () {
  // only run when the password is modified
  if (!this.isModified("password")) return;

  //   hash the password with the salt value as 12
  this.password = await bcrypt.hash(this.password, 12);

  //   delete the passwordConfirm field
  this.passwordConfirm = undefined;
});

// instance methods
userSchema.methods.correctPassword = async function (
  candiatePassword,
  userPassword
) {
  return await bcrypt.compare(candiatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangeAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangeAt.getTime() / 1000,
      10
    );
    return JWTTimeStamp < changedTimeStamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model("User", userSchema);
export { User };
