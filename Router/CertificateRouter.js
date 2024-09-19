import express from "express";
import {
  createCertificateBlog,
  deleteCertificateBlog,
  getAllCertificateBlog,
  getOneBlog,
  updateCertificateBlog
}
  from "../Controller/certificateController.js";
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
  
router.post("/", upload.single('image') , createCertificateBlog);
router.get("/" , getAllCertificateBlog);
router.get("/:id" , getOneBlog)
router.put("/:CertificateId" , updateCertificateBlog);
router.delete("/:BlogId" , deleteCertificateBlog);
export default router