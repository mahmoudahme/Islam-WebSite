import Fasting from "../Model/Pilar of Islam/RamadanFasting.js";
import { ApiError } from "../Utils/apiError.js";
import { verifyToken } from "../Utils/verifyToken.js";
import { v2 as cloudinary } from "cloudinary";

export const createFastingBlog = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user.isAdmin) {
        const { title, description } = req.body;
        const image = req.file.originalname;
        cloudinary.config({
          cloud_name: "dcrxqcgsr",
          api_key: "877545668177469",
          api_secret: "c4UWnxFWIHzWt7iYTXecqiwYKzQ", // Click 'View API Keys' above to copy your API secret
        });
        cloudinary.uploader.upload(req.file.path, async function (err, result) {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: false,
              message: "Error",
            });
          }
        const newFastingBlog = new Fasting({
          title: title,
          description: description,
          image: result.url 
        });
        await newFastingBlog.save();
        res.status(200).json({ message: "New Blog Created in The Fasting " })

      })
    //   } else {
    //     return next(new ApiError("You are not Admin to use this Feature", 404))
    //   }
    // })

  } catch (error) {
    return next(new ApiError("Error in Creation", 400))
  }
};

export const getAllFastingBlog = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user) {
        const FastingBlog = await Fasting.find();
        res.status(200).json({ FastingBlog: FastingBlog })
    //   } else {
    //     return next(new ApiError("You are not Authentcator to use this Feature", 404))
    //   }
    // })
  } catch (error) {
    return next(new ApiError("Error in Get ", 400))
  }
};

export const getOneBlog = async(req , res , next)=>{
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user) {
        const id = req.params.id
        const Blog = await Fasting.findById({_id : id});
        res.status(200).json({ Blog: Blog })
    //   } else {
    //     return next(new ApiError("You are not Authentcator to use this Feature", 404))
    //   }
    // })
  } catch (error) {
    return next(new ApiError("Error in Get ", 400))
  }
}

export const updateFastingBlog = async (req, res, next) => {
  try {
    if(req.files.length > 0){
      cloudinary.config({
        cloud_name: "dcrxqcgsr",
        api_key: "877545668177469",
        api_secret: "c4UWnxFWIHzWt7iYTXecqiwYKzQ", // Click 'View API Keys' above to copy your API secret
      });
      cloudinary.uploader.upload(req.files[0].path, async function (err, result) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: "Error",
          });
        }
        const FastingId = req.params.FastingId;
        const newFastingBlog = await Fasting.findByIdAndUpdate(
          FastingId,
          { $set: req.body , image : result.url},
          { new: true });
        res.status(200).json({ message: "Blog is Updated", newFastingBlog: newFastingBlog })
      })
    }else{
      const FastingId = req.params.FastingId;
        const newFastingBlog = await Fasting.findByIdAndUpdate(
          FastingId,
          { $set: req.body },
          { new: true });
        res.status(200).json({ message: "Blog is Updated", newFastingBlog: newFastingBlog })
    }
    // verifyToken(req, res, async () => {
    //   if (req.user.isAdmin) {
        
    //   }else{
    //     return next(new ApiError("You are not Admin to use this Feature", 404))
    //   }
    // })
  } catch (error) {
    return next(new ApiError("Error in Update", 400))
  }
}
export const deleteFastingBlog = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user.isAdmin) {
        const BlogId = req.params.BlogId;
         await Fasting.findByIdAndDelete({_id : BlogId})
        res.status(200).json({ message: "Blog is Deleted"})
    //   }else{
    //     return next(new ApiError("You are not Admin to use this Feature", 404))
    //   }
    // })
  } catch (error) {
    return next(new ApiError("Error in Update", 400))
  }
}