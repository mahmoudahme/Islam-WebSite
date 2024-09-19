import Life from "../Model/Purpose of Life/Life.js";
import { ApiError } from "../Utils/apiError.js";
import { verifyToken } from "../Utils/verifyToken.js";

export const createLifeBlog = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user.isAdmin) {
        const { title, description } = req.body;
        const image = req.file.originalname;
        const newLifeBlog = new Life({
          title: title,
          description: description,
          image: image 
        });
        await newLifeBlog.save();
        res.status(200).json({ message: "New Blog Created in The Life " })
      // } else {
      //   return next(new ApiError("You are not Admin to use this Feature", 404))
      // }
    // })

  } catch (error) {
    return next(new ApiError("Error in Creation", 400))
  }
};

export const getAllLifeBlog = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user) {
        const LifeBlog = await Life.find();
        res.status(200).json({ LifeBlog: LifeBlog })
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
        const Blog = await Life.findById({_id : id});
        res.status(200).json({ Blog: Blog })
    //   } else {
    //     return next(new ApiError("You are not Authentcator to use this Feature", 404))
    //   }
    // })
  } catch (error) {
    return next(new ApiError("Error in Get ", 400))
  }
}

export const updateLifeBlog = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user.isAdmin) {
        const LifeId = req.params.LifeId;
        const newLifeBlog = await Life.findByIdAndUpdate(
          LifeId,
          { $set: req.body },
          { new: true });
        res.status(200).json({ message: "Blog is Updated", newLifeBlog: newLifeBlog })
    //   }else{
    //     return next(new ApiError("You are not Admin to use this Feature", 404))
    //   }
    // })
  } catch (error) {
    return next(new ApiError("Error in Update", 400))
  }
}
export const deleteLifeBlog = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user.isAdmin) {
        const BlogId = req.params.BlogId;
         await Life.findByIdAndDelete({_id : BlogId})
        res.status(200).json({ message: "Blog is Deleted"})
    //   }else{
    //     return next(new ApiError("You are not Admin to use this Feature", 404))
    //   }
    // })
  } catch (error) {
    return next(new ApiError("Error in Update", 400))
  }
}