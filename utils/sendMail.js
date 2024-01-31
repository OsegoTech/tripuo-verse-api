import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendEmail = async options => {
  try {
    // create email transporter
    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "89bf11efe6afd2",
        pass: "1dbb3a23b39c04"
      }
    });

    // define email options
    const mailOptions ={
      from: "Admin <admin1@gmail.com>",
      to: options.email,
      subject: options.subject,
      text: options.message,
    };

    // send email
    await transporter.sendMail(mailOptions);
    console.log("email sent sucessfully");
  } catch (error) {
    console.log("email not sent");
    console.log(error);
  }
};

