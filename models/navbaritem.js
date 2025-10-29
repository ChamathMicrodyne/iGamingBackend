import mongoose from "mongoose";

const navbaritemSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true
  }
});

const Navbaritem = mongoose.model("navbaritem", navbaritemSchema);

export default Navbaritem;
