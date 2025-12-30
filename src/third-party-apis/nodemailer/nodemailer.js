const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

async function sendOtp(email, otp) {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "OTP Verification",
    html: `
  <h1 style="font-size: small;">OTP Verification</h1>
  <h3>hello</h3>
  <p style="background-color: black; padding: 0.5rem;">your otp is ${otp}</p>

        `,
  };

  await transporter.sendMail(mailOptions);
  console.log("OTP Sent");
}

const targetMail = "reddysivananda82@gmail.com";
const otp = "6969";

sendOtp(targetMail, otp);
