import Videos from "../Model/Faith/Videos.js";
import { ApiError } from "../Utils/apiError.js";
import { verifyToken } from "../Utils/verifyToken.js";
import { fileURLToPath } from "url";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

export const CreateNewVideo = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user.isAdmin) {
    const { title, author, description } = req.body;
    const videoName = req.file.filename;
    cloudinary.config({
      cloud_name: "dcrxqcgsr",
      api_key: "877545668177469",
      api_secret: "c4UWnxFWIHzWt7iYTXecqiwYKzQ", // Click 'View API Keys' above to copy your API secret
    });
    cloudinary.uploader.upload(req.file.path,{
      resource_type: "video"
    },
       async function (err, result) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: "Error",
          });
        }
        const newVideosBlog = new Videos({
          title: title,
          author: author,
          description: description,
          videoName: result.url,
        });
        await newVideosBlog.save();
        res.status(200).json({ message: "New Video Created in The Faith " });
      }
      )

    //   } else {
    //     return next(new ApiError("You are not Admin to use this Feature", 404));
    //   }
    // });
  } catch (error) {
    return next(new ApiError("Error in Creation", 400));
  }
};

export const getAllVideosBlog = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user) {
    const VideoBlog = await Videos.find();
    res.status(200).json({ VideoBlog: VideoBlog });
    //   } else {
    //     return next(new ApiError("You are not Authentcator to use this Feature", 404))
    //   }
    // })
  } catch (error) {
    return next(new ApiError("Error in Get ", 400));
  }
};

export const getOneVideo = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user) {
    const id = req.params.id;
    const Video = await Videos.findById({ _id: id });
    const videoUrl = `/uploads/videos/${Video.videoName}`;
    res.status(200).json({ data: Video, Video: videoUrl });
    //   } else {
    //     return next(new ApiError("You are not Authentcator to use this Feature", 404))
    //   }
    // })
  } catch (error) {
    return next(new ApiError("Error in Get ", 400));
  }
};

export const updateVideoBlog = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user.isAdmin) {
      if(req.files.length > 0){
      
        const VerseId = req.params.verseId;
        cloudinary.config({
          cloud_name: "dcrxqcgsr",
          api_key: "877545668177469",
          api_secret: "c4UWnxFWIHzWt7iYTXecqiwYKzQ", // Click 'View API Keys' above to copy your API secret
        });
        cloudinary.uploader.upload(req.files[0].path,{
          resource_type: "video"
        }, async function (err, result) {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: false,
              message: "Error",
            });
          }
          const VideoId = req.params.VideoId;
    const newVideoBlog = await Videos.findByIdAndUpdate(
      VideoId,
      { $set: req.body , videoName:result.url},
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Video is Updated", newVideoBlog: newVideoBlog });
        })
      }else{
        const VideoId = req.params.VideoId;
    const newVideoBlog = await Videos.findByIdAndUpdate(
      VideoId,
      { $set: req.body },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Video is Updated", newVideoBlog: newVideoBlog });
      }
    
    //   }else{
    //     return next(new ApiError("You are not Admin to use this Feature", 404))
    //   }
    // })
  } catch (error) {
    return next(new ApiError("Error in Update", 400));
  }
};
export const deleteVideoBlog = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user.isAdmin) {
    const VideoId = req.params.VideoId;
    await Videos.findByIdAndDelete({ _id: VideoId });
    res.status(200).json({ message: "Video is Deleted" });
    //   }else{
    //     return next(new ApiError("You are not Admin to use this Feature", 404))
    //   }
    // })
  } catch (error) {
    return next(new ApiError("Error in Update", 400));
  }
};
