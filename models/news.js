import mongoose from "mongoose";

const newsSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: () => {
      // Sri Lanka time (UTC+5:30)
      const now = new Date();
      const slOffset = 5.5 * 60 * 60 * 1000;
      return new Date(now.getTime() + slOffset);
    },
  },
  reference: [
    {
      name: {
        type: String,
        required: true,
      },
      link: {
        type: String,
        required: true,
      },
    },
  ],
  tags: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const News = mongoose.model("news", newsSchema);

export default News;
