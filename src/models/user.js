const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
    },
    age: {
      type: Number,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("invalid email address " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Please choose a strong password " + value);
        }
      },
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Please check the valid gender");
        }
      },
    },
    skills: {
      type: [String],
    },
    about: {
      type: String,
      default: "this is about page",
    },
    photoUrl: {
      type: String,
      default: "https://google.com",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("invalid email address " + value);
        }
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
