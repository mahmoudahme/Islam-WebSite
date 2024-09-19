import express from "express";
import {
  createLifeBlog,
  deleteLifeBlog,
  getAllLifeBlog,
  getOneBlog,
  updateLifeBlog
}
  from "../Controller/LifeController.js";
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
  
router.post("/", upload.single('image') , createLifeBlog);
router.get("/" , getAllLifeBlog);
router.get("/:id" , getOneBlog)
router.put("/:LifeId" , updateLifeBlog);
router.delete("/:BlogId" , deleteLifeBlog);
export default router