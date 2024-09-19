import quranicVersesModel from "../Model/Monothesim/quranicVersesModel.js";
import { ApiError } from "../Utils/apiError.js";
import { verifyToken } from "../Utils/verifyToken.js";

export const createQuranicVerses = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user.isAdmin) {
        const { surah, content, NumberOfVerse } = req.body;
        const newQuranicVerses = new quranicVersesModel({
          surah: surah,
          content: content,
          NumberOfVerse: NumberOfVerse
        });
        await newQuranicVerses.save();
        res.status(200).json({ message: "New Quran Verse Created in The Monotheism " })
      // } else {
      //   return next(new ApiError("You are not Admin to use this Feature", 404))
      // }
    // })

  } catch (error) {
    return next(new ApiError("Error in Creation", 400))
  }
};

export const getAllQuranicVerses = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user) {
        const QuranicVerses = await quranicVersesModel.find();
        res.status(200).json({ QuranicVerses: QuranicVerses })
    //   } else {
    //     return next(new ApiError("You are not Authentcator to use this Feature", 404))
    //   }
    // })
  } catch (error) {
    return next(new ApiError("Error in Get ", 400))
  }
};

export const getOneQuranicVerse = async(req , res , next)=>{
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user) {
        const id = req.params.id
        const QuranicVerses = await quranicVersesModel.findById({_id : id});
        res.status(200).json({ QuranicVerses: QuranicVerses })
    //   } else {
    //     return next(new ApiError("You are not Authentcator to use this Feature", 404))
    //   }
    // })
  } catch (error) {
    return next(new ApiError("Error in Get ", 400))
  }
}

export const updateQuranicVerses = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user.isAdmin) {
        const VerseId = req.params.verseId;
        console.log(VerseId)
        const newVerse = await quranicVersesModel.findByIdAndUpdate(
          VerseId,
          { $set: req.body },
          { new: true });
        res.status(200).json({ message: "Verse is Updated", QuranicVerses: newVerse })
    //   }else{
    //     return next(new ApiError("You are not Admin to use this Feature", 404))
    //   }
    // })
  } catch (error) {
    return next(new ApiError("Error in Update", 400))
  }
}
export const deleteQuranicVerses = async (req, res, next) => {
  try {
    // verifyToken(req, res, async () => {
    //   if (req.user.isAdmin) {
        const VerseId = req.params.verseId;
         await quranicVersesModel.findByIdAndDelete({_id : VerseId})
        res.status(200).json({ message: "Verse is Deleted"})
    //   }else{
    //     return next(new ApiError("You are not Admin to use this Feature", 404))
    //   }
    // })
  } catch (error) {
    return next(new ApiError("Error in Update", 400))
  }
}