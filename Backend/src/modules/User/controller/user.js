import userModel from "../../../../DB/models/user.model.js";
import {sendEmail} from "../../../utils/emailService.js";
import cloudinary from "../../../utils/cloudinary.js";
// import { hashPassword, comparePassword } from "../../../utils/hashPassword.js";


// get user profile Data
export const userProfile = async (req, res, next)=>{
    const user = await userModel.findById(req.params.id);
    if (user) {
        res.json({message: "Done", user});
    }
    res.json({message: "no user found"});
}

// contact us, user can send email to admin
export const sendMessage = async (req, res, next) => {
    const {phone, email, message} = req.body;
    const html = `
    <h1>Dear Sir,</h1>
    <h2> kindly, contact me</h2>
    <h3> phone number: ${phone}  </h3>
    <h3> email: ${email} </h3>
    <h3> message: ${message} </h3>
    <h3> I appreciate your efforts</h3>
    <br />
    <h4> Thanks in advance </h4>
    `;
    const info = await sendEmail({to: email, subject: 'contact Email', html})
    return res.status(200).json({message: "we will contact you soon ..."})

}

// update profile pic and Bio chat
export const updateUserChat = async (req, res, next) => {
    const {bio} = req.body;
    const path = req.file.path;
    const {id} = req.params;

    if (path) {
        const {public_id}= await cloudinary.uploader.
        upload(path);
        if (bio) {
            const user = await userModel.findOneAndUpdate({_id: id},
                {chatPic:{secure_url , public_id}, chatBio: bio})
        }
        const user = await userModel.findOneAndUpdate({_id: id},
            {chatPic: public_id})
    }
}

// update user profile
export const userUpdateProfile = async (req, res, next) => {
    const {firstName, lastName} = req.body;
    const path = req.file.path;
    const {id} = req.params;

    if (!req.file) return next(new ResError("no photo ", 404 ))
    // fetch user data
    const user = await userModel.findById({_id: id});
    if (!user) {
        return next(new ResError("can't update profile data ", 404 ))
    }
    const {secure_url}= await cloudinary.uploader.upload(path);
    console.log(secure_url);
    if (!secure_url) return next(new ResError("can't upload photo on cloud ", 404 ))

    const updatedUser = await userModel.findOneAndUpdate({_id: id},
            {name:{
                firstName,
                lastName
            },
            profilePic: secure_url},
            {new: true}
        )
    if (!updatedUser) return next(new ResError("can't update DB ", 404 ))
    res.json({message: "updated", updatedUser});
}

// get all users
export const getAllUsers = async (req, res, next)=>{
    const users = await userModel.find();
    if (users) {
        res.json({message: "Done", users});
    }
    res.json({message: "no users found"});
}

// delete user
export const deleteUser = async (req, res, next)=>{
    const user = await userModel.findOneAndDelete(req.params.id);
    console.log(user);
    if (user) {
        res.json({message: " Deleted", user});
    }
    res.json({message: "no users found"});
}

// update user Data
export const userUpdate = async (req, res, next)=>{
    const {firstName, lastName, profilePic} = req.body;
    const id = req.params.id;
    const updatedUser = await userModel.findOneAndUpdate({_id: id},
        {name:{
            firstName,
            lastName
        },
        profilePic},
        {new: true}
    )
    if (updatedUser) {
        res.json({message: "updated successfully", updatedUser});
    }
    res.json({message: "no user found"});
}
