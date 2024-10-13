import userModel from "../../../../DB/models/user.model.js";
import {sendEmail} from "../../../utils/emailService.js"


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
