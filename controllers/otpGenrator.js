const otpgenerator = require("otp-generator");
const nodemailer=require('nodemailer');

const generateOTP = () => {
    const OTP = otpgenerator.generate(6,{
        upperCaseAlphabets:false,
        specialChars:false,
        lowerCaseAlphabets:false,
        digits:true
    });
    return OTP;
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

function SentMail(email,otp){
  const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'OTP for registraion from GoldeX',
      text: 'Your verification code:'+otp
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    
}
module.exports = {
  generateOTP,
  SentMail
};
