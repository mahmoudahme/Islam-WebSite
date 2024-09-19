import monothesimBlogsModel from "../Model/Monothesim/monothesimBlogsModel.js";
import { ApiError } from "../Utils/apiError.js";
import { verifyToken } from "../Utils/verifyToken.js";

export const createMonothesimBlog = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user.isAdmin) {
        const { title, description , surah ,contentArabic , contentEnglish , NumberOfVerse } = req.body;
        const image = req.file.originalname;
        const newmonothesimBlog = new monothesimBlogsModel({
          title: title,
          description: description,
          image: image ,
          surah: surah,
          contentEnglish: contentEnglish ,
          contentArabic: contentArabic ,
          NumberOfVerse: NumberOfVerse
        });
        await newmonothesimBlog.save();
        res.status(200).json({ message: "New Blog Created in The Monotheism " })
      // } else {
      //   return next(new ApiError("You are not Admin to use this Feature", 404))
      // }
    // })

  } catch (error) {
    return next(new ApiError("Error in Creation", 400))
  }
}; 

export const getAllMonothesimBlog = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user) {
        const monothesimBlog = await monothesimBlogsModel.find();
        res.status(200).json({ monothesimBlog: monothesimBlog })
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
        const Blog = await monothesimBlogsModel.findById({_id : id});
        res.status(200).json({ Blog: Blog })
    //   } else {
    //     return next(new ApiError("You are not Authentcator to use this Feature", 404))
    //   }
    // })
  } catch (error) {
    return next(new ApiError("Error in Get ", 400))
  }
}

export const updateMonothesimBlog = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user.isAdmin) {
        const VerseId = req.params.verseId;
        console.log(VerseId)
        const newmonothesimBlog = await monothesimBlogsModel.findByIdAndUpdate(
          VerseId,
          { $set: req.body },
          { new: true });
        res.status(200).json({ message: "Blog is Updated", newmonothesimBlog: newmonothesimBlog })
    //   }else{
    //     return next(new ApiError("You are not Admin to use this Feature", 404))
    //   }
    // })
  } catch (error) {
    return next(new ApiError("Error in Update", 400))
  }
}
export const deleteMonothesimBlog = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user.isAdmin) {
        const BlogId = req.params.BlogId;
         await monothesimBlogsModel.findByIdAndDelete({_id : BlogId})
        res.status(200).json({ message: "Blog is Deleted"})
    //   }else{
    //     return next(new ApiError("You are not Admin to use this Feature", 404))
    //   }
    // })
  } catch (error) {
    return next(new ApiError("Error in Update", 400))
  }
}