import express from "express";
import fs from "fs"
import multer from "multer";
import path from "path";

import {
  createProgram,
  deleteProgram,
  getAllPrograms,
  getOneProgram,
  updatePrograms
} from "../Controller/ProgramController.js"; 

const uploadDir = 'uploads/Videos';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
// إعداد Multer لرفع الصور
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // مسار حفظ الملفات
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);// اسم الملف
  },
});

const upload = multer({ storage: storage });
const router = express.Router();

router.post("/", upload.single('file'), createProgram); 
router.get("/", getAllPrograms);
router.get("/:id", getOneProgram);
router.put("/:verseId", updatePrograms);
router.delete("/:BlogId", deleteProgram);
export default router;
