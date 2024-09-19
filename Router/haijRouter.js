import express from "express";
import {
  createHaijBlog,
  deleteHaijBlog,
  getAllHaijBlog,
  getOneBlog,
  updateHaijBlog
}
  from "../Controller/haijController.js";
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
  
router.post("/", upload.single('image') , createHaijBlog);
router.get("/" , getAllHaijBlog);
router.get("/:id" , getOneBlog)
router.put("/:HaijId" , updateHaijBlog);
router.delete("/:BlogId" , deleteHaijBlog);
export default router