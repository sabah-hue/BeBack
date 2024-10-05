import nodemailer from 'nodemailer';

export const sendEmail =async ({to="" , html="",subject="" , attachments=[]} = {})=>{
    let mailTransporter = nodemailer.createTransport({
    //   host:'smtp.ethereal.email',
    //   port:587,
    //   secure:false,
      service:"gmail",
      auth:{
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS 
      }
    });

    let info = await mailTransporter.sendMail({
        from: `"BeBack Community" <${process.env.EMAIL}>`,
        to,
        subject,
        html,
        attachments:attachments
        });
    
        console.log(info);
        return info.rejected.length ? false : true
        // return info;
}