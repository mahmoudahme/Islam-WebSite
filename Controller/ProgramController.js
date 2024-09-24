import program from "../Model/Programs/Program.js";
import { ApiError } from "../Utils/apiError.js";
import { verifyToken } from "../Utils/verifyToken.js";

export const createProgram = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user.isAdmin) {
        const { programName, programType, description} = req.body;
        const newFile =  req.file.filename ;
        console.log(newFile) 
        const newprogram = new program({
          programName : programName ,
          programCategory: programType,
          description: description ,  
          programFile : newFile 
        });
        await newprogram.save();  
        res.status(200).json({ message: "New Program Created in The Programs " })
      } else {
        return next(new ApiError("You are not Admin to us e this Feature", 404))
      }
    })

  } catch (error) {
    return next(new ApiError(`Error in Creation ${error}`, 400))
  }
}; 

export const getAllPrograms = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user) {
        const Programs = await program.find();
        res.status(200).json({ Programs: Programs })
      } else {
        return next(new ApiError("You are not Authentcator to use this Feature", 404))
      }
    })
  } catch (error) {
    return next(new ApiError("Error in Get ", 400))
  }
};

export const getOneProgram = async(req , res , next)=>{
  try {
    verifyToken(req, res, async () => {
      if (req.user) {
        const id = req.params.id
        const Program = await program.findById({_id : id});
        res.status(200).json({ Program: Program })
      } else {
        return next(new ApiError("You are not Authentcator to use this Feature", 404))
      }
    })
  } catch (error) {
    return next(new ApiError("Error in Get ", 400))
  }
}

export const updatePrograms = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user.isAdmin) {
        const programId = req.params.programId;
        const ProgramUpdated = await program.findByIdAndUpdate(
          programId,
          { $set: req.body },
          { new: true });
        res.status(200).json({ message: "Program is Updated", ProgramUpdated: ProgramUpdated })
      }else{
        return next(new ApiError("You are not Admin to use this Feature", 404))
      }
    })
  } catch (error) {
    return next(new ApiError("Error in Update", 400))
  }
}
export const deleteProgram = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user.isAdmin) {
        const programId = req.params.programId;
         await program.findByIdAndDelete({_id : programId})
        res.status(200).json({ message: "program is Deleted"})
      }else{
        return next(new ApiError("You are not Admin to use this Feature", 404))
      }
    })
  } catch (error) { 
    return next(new ApiError("Error in Update", 400))
  }
}