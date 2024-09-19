import mongoose from "mongoose";

const programSchema = new mongoose.Schema({
  programName: {
    type: String,
    required: true,
  },
  programCategory: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  programFile: {
    type: String,
    required: true,
  },

});

export default mongoose.model("programs", programSchema);
