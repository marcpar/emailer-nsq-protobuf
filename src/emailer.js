import nodemailer from "nodemailer";
import email from "./config/email"
import { } from 'dotenv/config';


// async..await is not allowed in global scope, must use a wrapper
export default async function emailer(emailMessage) {
    console.log(emailMessage);
    let info;
    try {
        // send mail with defined transport object
        info = await email.sendMail({
            from: emailMessage.from, // sender address
            to: emailMessage.to, // list of receivers
            subject: emailMessage.subject, // Subject line
            text: emailMessage.text, // plain text body
            html: emailMessage.html // html body
        });
    } catch (err) {
        console.error("SENDING ERROR MESSAGE: " + err.message)
        return false;
    }

    console.info("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    if (process.env.NODE_ENV != "production")
        // Preview only available when sending through an Ethereal account
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

        console.info("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    return true
}



