const HttpError = require("../utils/HttpError");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const Email = require("../utils/Email");
const crypto = require("crypto");
const Yup = require("yup");
const selectFields = require("../utils/selectFields.js");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

//////////////////////////////////////////////////////////////////////
// we creat&send token in signin, singup, resetPassword, updatePassword,
const createSendToken = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  user.password = undefined;

  setCookie(token, res);

  res.status(statusCode).json({ status: "success", data: { user } });
};

function setCookie(token, res) {
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    secure: process.env.NODE_ENV === "production" ? true : false,
    httpOnly: process.env.NODE_ENV === "production" ? true : false,
  };
  res.cookie("jwt", token, cookieOptions);
}

////////////////////////////////////////////////////////////////////////

const validatUserInput = async (data) => {
  // create validation schema
  const userSchema = Yup.object({
    name: Yup.string().required().trim(),
    email: Yup.string().required().trim().email(),
    password: Yup.string().required().trim().min(8),
    passwordConfirm: Yup.string()
      .required()
      .trim()
      .min(8)
      .test("passwordConfirm", "passwords Don't match", function (val) {
        return val === this.parent.password;
      }),
  });

  try {
    await userSchema.validate(data);
  } catch (err) {
    // we throw error here cause this fn if rejected it will be fulfilled and the HOF will not catch any errors
    //, so to give HOF this error we need to throw it
    throw new HttpError(err.message, 401);
  }
};

//////////////////////////////////////////////////////////////////////
exports.signUp = catchAsync(async (req, res, next) => {
  const filterdBody = selectFields(req.body, [
    "name",
    "email",
    "password",
    "passwordConfirm",
  ]);
  await validatUserInput(filterdBody);

  // check if user already exist

  const user = await User.findOne({ email: filterdBody.email });
  if (user)
    return next(
      new HttpError(
        "This user already exist, visit /forgotpassword to reset your password."
      )
    );

  await sendMail(res, filterdBody);
});

async function sendMail(res, user) {
  try {
    const token = jwt.sign(user, process.env.JWT_ACTIVATION_SECRET, {
      expiresIn: "40min",
    });
    const url = `${process.env.CLIENT_SIDE_SERVER}/activate-account/${token}`;
    const msg = `Email has been sent successfully to ${user.email}, please follow the instructions to activate your account`;

    await new Email(user, url).sendWelcome();

    res.status(200).json({ status: "success", message: msg });
  } catch (error) {
    console.log(error);
    throw new HttpError(
      `Something went wrong while sending email, Please try again`,
      500
    );
  }
}
/////////////////////////////////////////////////////////////////////////

exports.activateAccount = catchAsync(async (req, res, next) => {
  const token = req.body.token;

  existingToken(token);

  const userData = validateToken(token);

  const newUser = await User.create(userData);
  createSendToken(newUser, 201, res);
});

function existingToken(token) {
  if (!token)
    throw new HttpError(
      "There is no activation token, Please check your inbox.",
      401
    );
}

function validateToken(token) {
  return jwt.verify(
    token,
    process.env.JWT_ACTIVATION_SECRET,
    {},
    (err, value) => {
      if (err) throw err;
      return value;
    }
  );
}

//////////////////////////////////////////////////////////////////////
exports.signIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  existingUserData(email, password);

  const user = await User.findOne({ email }).select("+password");

  await validateUserData(password, user);

  createSendToken(user, 200, res);
});

function existingUserData(email, password) {
  if (!email || !password)
    throw new HttpError("Please provide email and password", 400);
}

async function validateUserData(inputPassword, user) {
  if (!user || !(await user.comparePasswords(inputPassword, user.password))) {
    throw new HttpError("Incorrect email or password", 400);
  }
}

//////////////////////////////////////////////////////////////////////

exports.protect = catchAsync(async (req, res, next) => {
  const token = req.cookies.jwt;

  const user = await validateUserPermission(token);

  req.user = user;
  next();
});

//////////////////////////////////////////////////////////////////////

exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(
        new HttpError(
          "You don't have permission to access to this route! ",
          403
        )
      );

    return next();
  };

//////////////////////////////////////////////////////////////////////
exports.forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    return next(
      new HttpError(
        "No user found with that email , Please signup to get access",
        400
      )
    );

  // 2) Create password reset token and password reset expire
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  const resetUrl = `${process.env.CLIENT_SIDE_SERVER}/reset-password/${resetToken}`;

  const resetUrlForClientSide = `${process.env.CLIENT_URL}/active-account/${resetToken}`;

  try {
    await new Email(user, resetUrl).sendPasswordReset();

    res.status(200).json({
      status: "success",
      message: "Email has successfully sent, Please check your inbox.",
    });
  } catch (error) {
    console.log(error);
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpiresIn = undefined;
    await user.save({ validateBeforeSave: false });
    next(
      new HttpError(
        "Something went wrong while sending the mail, Please try again later",
        500
      )
    );
  }
});

//////////////////////////////////////////////////////////////////////
exports.resetPassword = catchAsync(async (req, res, next) => {
  if (!req.body.password || !req.body.passwordConfirm) {
    return next(new HttpError("Please provide the new password", 400));
  }
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetTokenExpiresIn: { $gte: Date.now() },
  });
  if (!user)
    return next(
      new HttpError(
        "Invalid or expired Token . go to /forgotPassword to configure your new password",
        400
      )
    );

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpiresIn = undefined;
  await user.save();

  createSendToken(user, 201, res);
});

//////////////////////////////////////////////////////////////////////
exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");
  if (!(await user.comparePasswords(req.body.currentPassword, user.password))) {
    return next(new HttpError("The current password is incorrect", 401));
  }

  user.password = req.body.newPassword;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  createSendToken(user, 201, res);
});

//////////////////////////////////////////////////////////////////////
exports.logout = catchAsync(async (req, res, next) => {
  res.clearCookie("jwt");
  res
    .status(200)
    .json({ status: "success", message: "logged out successfully" });
});
//////////////////////////////////////////////////////////////////////
exports.isSignedIn = catchAsync(async (req, res, next) => {
  const token = req.cookies.jwt;

  const user = await validateUserPermission(token);

  res.status(200).json({ status: "success", data: { user } });
});

async function validateUserPermission(token) {
  if (!token)
    throw new HttpError(
      "You are not logged in! Please log in to get access",
      401
    );

  const decode = jwt.verify(
    token,
    process.env.JWT_SECRET_KEY,
    {},
    (err, val) => {
      if (err) throw err;
      return val;
    }
  );

  const user = await User.findById(decode.id);

  if (!user)
    throw new HttpError(
      "The user belonging to this token does no longer exist",
      401
    );

  if (user.isPasswordChangedAfter(decode.iat))
    throw new HttpError(
      "User currently changed password, Please login again",
      401
    );

  return user;
}

//////////////////////////////////////////////////
exports.googleLogin = catchAsync(async (req, res, next) => {
  const idToken = req.body.token;

  if (!idToken)
    return next(new HttpError("Google login failed, Try again", 400));

  // verify google token
  const ticket = await client.verifyIdToken({
    idToken,
    requiredAudience: process.env.GOOGLE_CLIENT_ID,
  });
  // Get user Data
  const { name, email } = ticket.getPayload();
  // Check if email already exists
  const user = await User.findOne({ email });
  // Singup if not exist
  if (!user) return saveUserToDB({ name, email, res });
  // Sign in if it exist
  createSendToken(user, 200, res);
});

async function saveUserToDB({ name, email, res }) {
  const password = email + "@@@@@$s";

  const user = await User.create({
    name,
    email,
    password,
    passwordConfirm: password,
  });

  createSendToken(user, 201, res);
}
