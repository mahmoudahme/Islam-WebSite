import mongoose from "mongoose";

const CertifcateBlogsSchema = new mongoose.Schema({
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

export default mongoose.model("CertifcateBlogs" , CertifcateBlogsSchema)