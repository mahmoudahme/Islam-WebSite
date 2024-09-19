import express from "express";
import fs from "fs"

import {
  createPrayerBlog,
  deletePrayerBlog,
  getAllPrayerBlog,
  getOneBlog,
  updatePrayerBlog
}
  from "../Controller/PrayerController.js";
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
  
router.post("/", upload.single('image') , createPrayerBlog);
router.get("/" , getAllPrayerBlog);
router.get("/:id" , getOneBlog)
router.put("/:prayerId" , updatePrayerBlog);
router.delete("/:BlogId" , deletePrayerBlog);
export default router