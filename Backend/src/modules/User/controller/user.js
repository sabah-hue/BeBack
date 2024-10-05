import userModel from "../../../../DB/models/user.model.js";
export const userProfile = async (req, res, next)=>{
    const user = await userModel.findById(req.user._id);
    res.json({message: "profile", user});
}
