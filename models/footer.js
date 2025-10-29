import mongoose from "mongoose";

export const Description = mongoose.model(
  "footerDescription",
  mongoose.Schema({
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      require: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
  })
);
export const SocialMedia = mongoose.model(
  "footerSocialMedia",
  mongoose.Schema({
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    icon: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    link: {
      type: String,
      require: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
  })
);
export const HotlinesNumbers = mongoose.model(
  "footerHotlineNumbers",
  mongoose.Schema({
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    number: {
      type: String,
      require: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
  })
);