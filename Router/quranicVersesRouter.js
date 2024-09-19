import express from "express";
import {
  createQuranicVerses,
  deleteQuranicVerses,
  getAllQuranicVerses,
  getOneQuranicVerse,
  updateQuranicVerses
}
  from "../Controller/quranicVersesController.js";

import { verifyToken } from "../Utils/verifyToken.js";
const router = express.Router();
  
router.post("/" , createQuranicVerses);
router.get("/" , getAllQuranicVerses);
router.get("/:id" , getOneQuranicVerse
);
router.put("/:verseId" , updateQuranicVerses);
router.delete("/:verseId" , deleteQuranicVerses);
export default router