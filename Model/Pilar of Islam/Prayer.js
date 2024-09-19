import mongoose from "mongoose";

const PrayerBlogsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model("PrayerBlogs" , PrayerBlogsSchema)