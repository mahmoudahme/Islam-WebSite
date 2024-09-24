import Books from "../Model/Faith/Books.js";
import { ApiError } from "../Utils/apiError.js";
import { verifyToken } from "../Utils/verifyToken.js";
import { fileURLToPath } from "url";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import { Views } from "../Middleware/UpdateView.js";

export const CreateNewBook = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user.isAdmin) {
        const { title, author, description } = req.body;
        const bookName = req.file.filename;
        cloudinary.config({
          cloud_name: "dcrxqcgsr",
          api_key: "877545668177469",
          api_secret: "c4UWnxFWIHzWt7iYTXecqiwYKzQ", // Click 'View API Keys' above to copy your API secret
        });
        cloudinary.uploader.upload(
          req.file.path,
          { resource_type: "auto" },
          async function (err, result) {
            if (err) {
              console.log(err);
              return res.status(500).json({
                success: false,
                message: "Error",
              });
            }
            const newBooksBlog = new Books({
              title: title,
              author: author,
              description: description,
              bookName: result.url,
            });
            await newBooksBlog.save();
            res
              .status(200)
              .json({ message: "New Books Created in The Faith " });
          }
        );
    //   } else {
    //     return next(new ApiError("You are not Admin to use this Feature", 404));
    //   }
    // });
  } catch (error) {
    return next(new ApiError("Error in Creation", 400));
  }
};
export const downloadController = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user) {
        const id = req.params.id;
        const book = await Books.findById(id);
        // استخدم المسار الكامل للملف
        const __filename = fileURLToPath(import.meta.url);
        const dirname = path.dirname(__filename);
        const filePath = path.join(
          dirname,
          "..",
          "uploads",
          "books",
          book.bookName
        );
        console.log(filePath);
        res.download(filePath, (err) => {
          if (err) {
            res
              .status(500)
              .json({ message: "خطأ أثناء تحميل الكتاب", error: err.message });
          }
        });
    //   } else {
    //     return next(new ApiError("You are not Admin to use this Feature", 404));
    //   }
    // });
  } catch (error) {
    return next(new ApiError("Error in Creation", 400));
  }
};
export const getAllBooksBlog = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user) {
        const bookBlog = await Books.find();
        await Views(bookBlog , Books)

        res.status(200).json({ bookBlog: bookBlog });
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

export const getOneBook = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user) {
        const id = req.params.id;
        const book = await Books.findById({ _id: id });
        const arr = [book]
        await Views(arr , Books)
        res.status(200).json({ book: book });
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

export const updateBookBlog = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user.isAdmin) {
        if (req.files.length > 0) {
          const VerseId = req.params.verseId;
          cloudinary.config({
            cloud_name: "dcrxqcgsr",
            api_key: "877545668177469",
            api_secret: "c4UWnxFWIHzWt7iYTXecqiwYKzQ", // Click 'View API Keys' above to copy your API secret
          });
          cloudinary.uploader.upload(
            req.files[0].path,
            { resource_type: "auto" },
            async function (err, result) {
              if (err) {
                console.log(err);
                return res.status(500).json({
                  success: false,
                  message: "Error",
                });
              }
              const bookId = req.params.bookId;
              const newBookBlog = await Books.findByIdAndUpdate(
                bookId,
                { $set: req.body, bookName: result.url },
                { new: true }
              );
              res
                .status(200)
                .json({ message: "Book is Updated", newBookBlog: newBookBlog });
            }
          );
        } else {
          const bookId = req.params.bookId;
          const newBookBlog = await Books.findByIdAndUpdate(
            bookId,
            { $set: req.body },
            { new: true }
          );
          res
            .status(200)
            .json({ message: "Book is Updated", newBookBlog: newBookBlog });
        }
    //   } else {
    //     return next(new ApiError("You are not Admin to use this Feature", 404));
    //   }
    // });
  } catch (error) {
    return next(new ApiError("Error in Update", 400));
  }
};
export const deleteBookBlog = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user.isAdmin) {
        const BookId = req.params.BookId;
        await Books.findByIdAndDelete({ _id: BookId });
        res.status(200).json({ message: "Book is Deleted" });
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
        const BooksId = req.params.id ;
        const BooksBlog = await Books.findById(BooksId);
        const updateLike = await Books.findByIdAndUpdate(
          BooksId , 
          {Likes : BooksBlog.Likes+=1 },
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