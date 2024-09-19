import express from "express";

import multer from "multer";
import {
  createMonothesimBlog,
  getAllMonothesimBlog,
  getOneBlog,
  updateMonothesimBlog,
  deleteMonothesimBlog,
} from "../Controller/monothesimBlogsController.js"; 

// إعداد Multer لرفع الصور
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/"); // مجلد تخزين الصور
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // حفظ الصورة باسمها الأصلي
  },
});
const upload = multer({ storage: storage });
const router = express.Router();

router.post("/",upload.single("image"), createMonothesimBlog);
router.get("/", getAllMonothesimBlog);
router.get("/:id", getOneBlog);
router.put("/:verseId", updateMonothesimBlog);
router.delete("/:BlogId", deleteMonothesimBlog);
export default router;
