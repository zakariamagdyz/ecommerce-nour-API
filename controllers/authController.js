const HttpError = require("../utils/HttpError");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const Email = require("../utils/Email");
const crypto = require("crypto");
const Yup = require("yup");
const selectFields = require("../utils/selectFields.js");

//////////////////////////////////////////////////////////////////////
const createSendToken = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    secure: process.env.NODE_ENV === "production" ? true : false,
    httpOnly: process.env.NODE_ENV === "production" ? true : false,
  };

  user.password = undefined;
  res.cookie("jwt", token, cookieOptions);
  res.status(statusCode).json({ status: "success", data: { user } });
};

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
exports.sendActivationToSignUp = catchAsync(async (req, res, next) => {
  const filterdBody = selectFields(req.body, [
    "name",
    "email",
    "password",
    "passwordConfirm",
  ]);
  await validatUserInput(filterdBody);

  const token = jwt.sign(filterdBody, process.env.JWT_ACTIVATION_SECRET, {
    expiresIn: "10min",
  });

  const url = `${process.env.CLIENT_SIDE_SERVER}/active-account/${token}`;

  try {
    await new Email(filterdBody, url).sendWelcome();

    const msg = `Email has been sent successfully to ${filterdBody.email}, please follow the instructions to activate your account`;

    res.status(200).json({ status: "success", message: msg });
  } catch (error) {
    console.log(error);
    return next(
      new HttpError(
        `Something went wrong while sending email, Please try again`,
        500
      )
    );
  }
});
/////////////////////////////////////////////////////////////////////////

exports.signUp = catchAsync(async (req, res, next) => {
  const token = req.body.token;
  if (!token)
    return next(
      new new HttpError(
        "There is no activation token, Please check your inbox",
        401
      )()
    );

  const userData = jwt.verify(
    token,
    process.env.JWT_ACTIVATION_SECRET,
    {},
    (err, value) => {
      if (err) throw err;
      return value;
    }
  );
  const newUser = await User.create(userData);
  createSendToken(newUser, 201, res);
});

//////////////////////////////////////////////////////////////////////
exports.signIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new HttpError("Please provide email and password", 400));
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePasswords(password, user.password))) {
    return next(new HttpError("Incorrect email or password", 400));
  }

  createSendToken(user, 200, res);
});

//////////////////////////////////////////////////////////////////////

exports.protect = catchAsync(async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token)
    return next(
      new HttpError("You are not logged in! Please log in to get access", 401)
    );

  const decode = await jwt.verify(
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
    return next(
      new HttpError(
        "The user belonging to this token does no longer exist",
        401
      )
    );

  if (user.isPasswordChangedAfter(decode.iat))
    return next(
      new HttpError("User currently changed password, Please login again", 401)
    );

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
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/lamaApi/v1/users/resetPassword/${resetToken}`;

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
  if (!token)
    return next(
      new HttpError("You are not logged in! Please log in to get access", 401)
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
    return next(
      new HttpError(
        "The user belonging to this token does no longer exist",
        401
      )
    );

  if (user.isPasswordChangedAfter(decode.iat))
    return next(
      new HttpError("User currently changed password, Please login again", 401)
    );

  res.status(200).json({ status: "success", data: { user } });
});
