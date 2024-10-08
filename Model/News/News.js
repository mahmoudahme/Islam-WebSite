import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    imageName: {
      type: String,
    },
    video: {
      type: String,
    },
    videoName: {
      type: String,
    },
    Likes: {
      type : Number ,
      default : 0 
    },
    Views : {
      type: Number ,
      default : 0 
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("New" , newsSchema)
