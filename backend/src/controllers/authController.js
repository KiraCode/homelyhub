import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { promisify } from "node:util";
import { forgotPasswordMailGenContent, sendMail } from "../utils/mail.js";
import crypto from "crypto";

const defaultAvatar = "https://i.pravatar.cc/150?img=27";

const signinToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signinToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.cookie("jwt", token, cookieOptions);

  //   remove the password
  user.password = undefined;

  res.status(statusCode).json({
    status: "Success",
    token,
    user,
  });
};

const filterObj = (obj, ...allowedFields) => {
  let newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

const signup = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      avatar: { url: req.body.avatar || defaultAvatar },
    });

    createSendToken(newUser, 201, res);
  } catch (error) {
    res.status(400).json({ status: "failed", message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Password Provide email and password");
    }

    const user = await User.findOne({ email }).select("+password");

    if (
      !user ||
      (await user.correctPassword(password, user.password)) === false
    ) {
      throw new Error("Incorrect email or password");
    }

    createSendToken(user, 200, res);
  } catch (error) {
    res.status(400).json({ status: "failed", message: error.message });
  }
};

const logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 100),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};

const protect = async (req, res, next) => {
  try {
    // step 1: getting the token and ccheck if it is there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt && req.cookies.jwt !== "loggedout") {
      token = req.cookies.jwt;
    }

    if (!token) {
      throw new Error("You are not logged in! Please Login to access");
    }
    // step 2: verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // step 3: check if the user exist
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      throw new Error("The user belonging to the token, doesn't exists");
    }

    // step 4: check if user chaned the password after the token is issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      throw new Error("user recently changed the password, Please Login Again");
    }

    // step 5: grant access to the protected routes
    req.user = currentUser;
    next();
  } catch (error) {
    res.status(401).json({
      status: "failed",
      message: error.message,
    });
  }
};

const updateMe = async (req, res) => {
  try {
    const filterBody = filterObj(req.body, "name", "phoneNumber", "avatar");

    if (req.body.avatar !== undefined) {
      let based64Data = req.body.avatar;

      const uploadResponse = await ImageTrackList.upload({
        file: based64Data,
        fileName: `avatar_${Date.now()}.jpg`,
        folder: "avatars",
        transformation: { pre: "w-150, h-150, c-scale" },
      });
      filterBody.avatar = {
        public_id: uploadResponse.fileId,
        url: uploadResponse.url,
      };
    }
    const updateUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      status: "Success",
      data: {
        user: updateUser,
      },
    });
  } catch (error) {
    res.status(401).json({
      status: "Failed",
      message: error.message,
    });
  }
};

const updatePassword = async (req, res) => {
  try {
    // 1. get current user
    const user = await User.findById(req.user.id).select("+password");

    // 2. get the current password from the body and compare with the password saved inside the db
    if (
      !(await user.correctPassword(req.body.passwordCurrent, user.password))
    ) {
      throw new Error("Your current password is wrong!");
    }

    // 3. if the current password is correct update the new password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;

    console.log(user);

    await user.save();

    // 4. log the user in by sending the token
    createSendToken(user, 200, res);
  } catch (error) {
    res.status(404).json({
      status: "Failed",
      message: error.message,
    });
  }
};

const forgotPassword = async (req, res) => {
  // 1. get the user through the email id provided in the input
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(400).json({
      error: "There is no user with this email",
    });
  }

  // 2.generate the reset token
  const resetToken = user.create.createPasswordResetToken();

  await user.save({ validateBeforeSave: false });

  const resetURL = `http://localhost:5173/user/resetPassword/${resetToken}`;

  // 3. send the email
  try {
    await sendMail({
      email: user.email,
      subject: "Reset your Password(Valid for 10min)",
      mailGenContent: forgotPasswordMailGenContent(user.name, resetURL),
    });

    res
      .status(200)
      .json({ status: "Success", message: "Token sent Successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    // 1. get user based token
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      passswordResetTojen: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    // 2. if the token has ot expired there is an user, set a new password
    if (!user) {
      throw new Error("Token is invalid or expired");
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    // 3. log the user in and send JWT
    createSendToken(user, 200, res);
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

const check = async (req, res) => {
  try {
    res.status(200).json({
      status: "Success",
      message: "Logged In",
      user: req.user,
    });
  } catch (error) {
    res.status(400).json({ status: "failed", message: "UnAuthorized" });
  }
};

export {
  signup,
  login,
  logout,
  protect,
  check,
  updateMe,
  forgotPassword,
  updatePassword,
  resetPassword
};
