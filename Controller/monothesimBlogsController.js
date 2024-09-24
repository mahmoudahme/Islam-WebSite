import monothesimBlogsModel from "../Model/Monothesim/monothesimBlogsModel.js";
import { ApiError } from "../Utils/apiError.js";
import {Views} from "../Middleware/UpdateView.js"
import { verifyToken } from "../Utils/verifyToken.js";
import { v2 as cloudinary } from "cloudinary";

export const createMonothesimBlog = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user.isAdmin) {
        const {
          title,
          description,
          surah,
          contentArabic,
          contentEnglish,
          NumberOfVerse,
        } = req.body;
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
          const newmonothesimBlog = new monothesimBlogsModel({
            title: title,
            description: description,
            image: result.url,
            imageName:image,
            surah: surah,
            contentEnglish: contentEnglish,
            contentArabic: contentArabic,
            NumberOfVerse: NumberOfVerse,
          });
          await newmonothesimBlog.save();
          res
            .status(200)
            .json({ message: "New Blog Created in The Monotheism " });
        });
    //   } else {
    //     return next(new ApiError("You are not Admin to use this Feature", 404));
    //   }
    // });
  } catch (error) {
    return next(new ApiError(`Error in Creation${error}`, 400));
  }
};

export const getAllMonothesimBlog = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user) {
        const monothesimBlog = await monothesimBlogsModel.find();
        await Views(monothesimBlog , monothesimBlogsModel)
        res.status(200).json({ monothesimBlog: monothesimBlog});
    //   } else {
    //     return next(
    //       new ApiError("You are not Authentcator to use this Feature", 404)
    //     );
    //   }
    // });
  } catch (error) {
    return next(new ApiError("Error in Get ", 400));
  }
};

export const getOneBlog = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user) {
        const id = req.params.id;
        const Blog = await monothesimBlogsModel.findById({ _id: id });
        const arr = [Blog] ;
        await Views(arr , monothesimBlogsModel)
        res.status(200).json({ Blog: arr });
    //   } else {
    //     return next(
    //       new ApiError("You are not Authentcator to use this Feature", 404)
    //     );
    //   }
    // });
  } catch (error) {
    return next(new ApiError("Error in Get ", 400));
  }
};

export const updateMonothesimBlog = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user.isAdmin) {
        const image = req.file.originalname;

        if (req.files.length > 0) {
          const VerseId = req.params.verseId;
          cloudinary.config({
            cloud_name: "dcrxqcgsr",
            api_key: "877545668177469",
            api_secret: "c4UWnxFWIHzWt7iYTXecqiwYKzQ", // Click 'View API Keys' above to copy your API secret
          });
          cloudinary.uploader.upload(
            req.files[0].path,
            async function (err, result) {
              if (err) {
                console.log(err);
                return res.status(500).json({
                  success: false,
                  message: "Error",
                });
              }
              const newmonothesimBlog =
                await monothesimBlogsModel.findByIdAndUpdate(
                  VerseId,
                  { $set: req.body, image: result.url },
                  { new: true }
                );
              res.status(200).json({
                message: "Blog is Updated",
                newmonothesimBlog: newmonothesimBlog,
              });
            }
          );
        } else {
          const VerseId = req.params.verseId;
          const newmonothesimBlog =
            await monothesimBlogsModel.findByIdAndUpdate(
              VerseId,
              { $set: req.body },
              { new: true }
            );
          res.status(200).json({
            message: "Blog is Updated",
            newmonothesimBlog: newmonothesimBlog,
          });
        }
    //   } else {
    //     return next(new ApiError("You are not Admin to use this Feature", 404));
    //   }
    // });
  } catch (error) {
    return next(new ApiError("Error in Update", 400));
  }
};
export const deleteMonothesimBlog = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user.isAdmin) {
        const BlogId = req.params.BlogId;
        await monothesimBlogsModel.findByIdAndDelete({ _id: BlogId });
        res.status(200).json({ message: "Blog is Deleted" });
    //   } else {
    //     return next(new ApiError("You are not Admin to use this Feature", 404));
    //   }
    // });
  } catch (error) {
    return next(new ApiError("Error in Update", 400));
  }
};

export const Likes = async(req , res , next )=>{
  try {
    // verifyToken(req , res , async()=>{
    //   if(req.user){
        const monothesimBlogId = req.params.id ;
        const monothesimBlog = await monothesimBlogsModel.findById(monothesimBlogId);
        const updateLike = await monothesimBlogsModel.findByIdAndUpdate(
          monothesimBlogId , 
          {Likes : monothesimBlog.Likes+=1 },
          {new : true}
        )
        res.status(200).json({
          message: "Likes is Updated",
          newmonothesimBlog: updateLike,
        });
    //   }else{
    //     new ApiError("You are not Authentcator to use this Feature", 404)
    //   }
    // })
  } catch (error) {
    return next(new ApiError("Error in Like Try Again Later", 400));
  }
} 
