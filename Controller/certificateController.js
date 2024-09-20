import Certificate from "../Model/Pilar of Islam/Certificate.js";
import { ApiError } from "../Utils/apiError.js";
import { verifyToken } from "../Utils/verifyToken.js";
import { v2 as cloudinary } from "cloudinary";

export const createCertificateBlog = async (req, res, next) => {
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
        const newCertificateBlog = new Certificate({
          title: title,
          description: description,
          image: result.url 
        });
        await newCertificateBlog.save();
        res.status(200).json({ message: "New Blog Created in The Certificate " })
      })
    //   } else {
    //     return next(new ApiError("You are not Admin to use this Feature", 404))
    //   }
    // })

  } catch (error) {
    return next(new ApiError("Error in Creation", 400))
  }
};

export const getAllCertificateBlog = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user) {
        const CertificateBlog = await Certificate.find();
        res.status(200).json({ CertificateBlog: CertificateBlog })
      // } else {
      //   return next(new ApiError("You are not Authentcator to use this Feature", 404))
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
        const Blog = await Certificate.findById({_id : id});
        res.status(200).json({ Blog: Blog })
    //   } else {
    //     return next(new ApiError("You are not Authentcator to use this Feature", 404))
    //   }
    // })
  } catch (error) {
    return next(new ApiError("Error in Get ", 400))
  }
}

export const updateCertificateBlog = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user.isAdmin) {
        const CertificateId = req.params.CertificateId;
        const newCertificateBlog = await Certificate.findByIdAndUpdate(
          CertificateId,
          { $set: req.body },
          { new: true });
        res.status(200).json({ message: "Blog is Updated", newCertificateBlog: newCertificateBlog })
    //   }else{
    //     return next(new ApiError("You are not Admin to use this Feature", 404))
    //   }
    // })
  } catch (error) {
    return next(new ApiError("Error in Update", 400))
  }
}
export const deleteCertificateBlog = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user.isAdmin) {
        const BlogId = req.params.BlogId;
         await Certificate.findByIdAndDelete({_id : BlogId})
        res.status(200).json({ message: "Blog is Deleted"})
    //   }else{
    //     return next(new ApiError("You are not Admin to use this Feature", 404))
    //   }
    // })
  } catch (error) {
    return next(new ApiError("Error in Update", 400))
  }
}