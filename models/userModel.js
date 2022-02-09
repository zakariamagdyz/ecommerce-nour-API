const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: [30, "The maximum length of name is 20 charchters"],
    required: [true, "Please tell us your name!"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    maxLength: [50, "The maximum length of email is 20"],
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, "Invalid email adress"],
  },
  photo: String,

  password: {
    type: String,
    required: [true, "Please provide your password"],
    minLength: [8, "The minimum length of password is 8 charchters"],
    maxLength: [30, "the maximum length of password is 30 charchters"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please provide your passwordConfirm"],
    minLength: [8, "The minimum length of password is 8 charchters"],
    maxLength: [30, "the maximum length of password is 30 charchters"],
    validate: {
      validator: function (val) {
        return this.password === val;
      },
      message: "The two passswords don't match",
    },
  },
  role: {
    type: String,
    enum: ["user", "admin", "superAdmin"],
    default: "user",
  },
  active: { type: Boolean, default: true },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetTokenExpiresIn: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 4 * 1000;

  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.comparePasswords = async function (candidatePass, pass) {
  return await bcrypt.compare(candidatePass, pass);
};

userSchema.methods.isPasswordChangedAfter = function (jwtTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return jwtTimestamp < changedTimeStamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetTokenExpiresIn = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
