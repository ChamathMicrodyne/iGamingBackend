import mongoose from "mongoose";

const categoryitemSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true
  }
});

const Categoryitem = mongoose.model("categoryitem", categoryitemSchema);

export default Categoryitem;
