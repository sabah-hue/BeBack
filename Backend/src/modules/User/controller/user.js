import userModel from "../../../../DB/models/user.model.js";
import {sendEmail} from "../../../utils/emailService.js"
import cloudinary from "../../../utils/cloudinary.js"


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
    const {path} = req.file;
    const {id} = req.params;

    if (path) {
        const {secure_url , public_id}= await cloudinary.uploader.
        upload(path);
        if (bio) {
            const user = await userModel.findOneAndUpdate({_id: id},
                {chatPic:{secure_url , public_id}, chatBio: bio})
        }
        const user = await userModel.findOneAndUpdate({_id: id},
            {chatPic:{secure_url , public_id}})
    }
}

// update user profile
export const userUpdateProfile = async (req, res, next) => {
    const {firstName, lastName, newPassword, oldPassword} = req.body;
    const {path} = req.file;
    const {id} = req.params;

    // fetch user data
    const user = await userModel.findById({_id: id});
    if (user) {
        // compare password with hashed password in DB
        const same = comparePassword(oldPassword, user.password);
        if(!same){
            return next(new ResError('incorrect Email or Password', 400 ))
    }
    const hashPass = hashPassword(newPassword);

    }
    if (path) {
        const {secure_url , public_id}= await cloudinary.uploader.
        upload(path);

        const user = await userModel.findOneAndUpdate({_id: id},
            {name:{
                firstName,
                lastName
            },
            email,
            password:hashPass,
            profilePic:{secure_url , public_id}})
    }
}
