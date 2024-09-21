import express from "express";
import fs from "fs"
import {
  createLifeBlog,
  deleteLifeBlog,
  getAllLifeBlog,
  getOneBlog,
  updateLifeBlog
}
  from "../Controller/LifeController.js";
import multer from "multer";

const uploadDir = 'uploads/Images';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// إعداد Multer لرفع الصور
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // مجلد تخزين الصور
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
router.put("/:LifeId", upload.any("image") , updateLifeBlog);
router.delete("/:BlogId" , deleteLifeBlog);
export default router