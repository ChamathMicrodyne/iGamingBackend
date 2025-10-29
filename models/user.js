import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  numbercode: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
    unique: true,
  },
  birthday: {
    type: String,
    required: true,
  },
  countrycode: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  zipcode: {
    type: Number,
    required: true,
  },
  nic: {
    type: String,
    required: true,
    unique: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  noncashbalance: {
    type: Number,
    default: 0,
  },
  emailverified: {
    type: Boolean,
    default: false
  },
  numberverified: {
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: true
  }
});

const User = mongoose.model("users", userSchema);

export default User;
