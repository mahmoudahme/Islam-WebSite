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
  },Likes: {
    type : Number ,
    default : 0 
  },
  Views : {
    type: Number ,
    default : 0 
  }
}, {
  timestamps: true
});

export default mongoose.model("CertifcateBlogs" , CertifcateBlogsSchema)