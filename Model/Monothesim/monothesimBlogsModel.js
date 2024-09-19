import mongoose from "mongoose";

const monothesimBlogsSchema = new mongoose.Schema({
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
  },
  surah: {
    type: String,
  },
  contentEnglish: {
    type: String,
  },
  contentArabic: {
    type: String,
  },
  NumberOfVerse: {
    type: String,
  }
}, {
  timestamps: true
});

export default mongoose.model("monothesimBlogs" , monothesimBlogsSchema)