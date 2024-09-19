import express from "express";
import {
  createFastingBlog,
  deleteFastingBlog,
  getAllFastingBlog,
  getOneBlog,
  updateFastingBlog
}
  from "../Controller/fastingController.js";
import multer from "multer";


// إعداد Multer لرفع الصور
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/'); // مجلد تخزين الصور
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // حفظ الصورة باسمها الأصلي
  }
});
const upload = multer({ storage: storage });
const router = express.Router();
  
router.post("/", upload.single('image') , createFastingBlog);
router.get("/" , getAllFastingBlog);
router.get("/:id" , getOneBlog)
router.put("/:FastingId" , updateFastingBlog);
router.delete("/:BlogId" , deleteFastingBlog);
export default router