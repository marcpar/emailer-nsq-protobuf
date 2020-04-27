import { } from 'dotenv/config';
import nodemailer from "nodemailer";


console.log("result: " + process.env.EMAIL_SECURE == "true" ? true : false);
// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,//process.env.EMAIL_SECURE == "true" ? true : false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USERNAME, // generated ethereal user
        pass: process.env.EMAIL_PASSWORD // generated ethereal password
    }
});

module.exports = transporter;