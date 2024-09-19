import express from "express";
import {
  createZakatBlog,
  deleteZakatBlog,
  getAllZakatBlog,
  getOneBlog,
  updateZakatBlog
}
  from "../Controller/zakatController.js";
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
  
router.post("/", upload.single('image') , createZakatBlog);
router.get("/" , getAllZakatBlog);
router.get("/:id" , getOneBlog)
router.put("/:ZakatId" , updateZakatBlog);
router.delete("/:BlogId" , deleteZakatBlog);
export default router