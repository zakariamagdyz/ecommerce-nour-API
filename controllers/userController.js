const factory = require("./factoryController");
const User = require("../models/userModel");
const HttpError = require("../utils/HttpError");
const selectedFields = require("../utils/selectFields");
const catchAsync = require("../utils/catchAsync");

//////////////////////////////////////////////////////////
exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm)
    return next(
      new HttpError(
        "This route is not for password update, Please use /updateMyPassword.",
        400
      )
    );

  const filterdBody = selectedFields(req.body, ["name", "email"]);

  const user = await User.findByIdAndUpdate(req.user._id, filterdBody, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({ status: "success", data: { user } });
});

/////////////////////////////////////////////
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};
//////////////////////////////////////////////
exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, { active: false });
  res.status(204).json({ status: "success", data: null });
});

// for Admin
exports.getUsers = factory.getAll(User);
exports.getAUser = factory.getOne(User);
exports.updateAUser = factory.updateOne(User);
exports.deleteAUser = factory.deleteOne(User);
exports.createAUser = (req, res, next) => {
  return next(
    new HttpError(
      "This route is not defined, Please use /signUp route to ",
      400
    )
  );
};
