const dotenv = require("dotenv");
const transporter = require("./emailer");

dotenv.config();

const sendRegistrationEmail = async ( email, password) => {
  try {
    
    const mailOption = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Account Registered",
      html: `<p>You have been registered for the ICEP program here are your login details: </p>
      <p> Username <b>${email}</b> </p>
      <p> Password <b>${password}</b> </p>`
      
    };

  
    await transporter.sendMail(mailOption);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendRegistrationEmail;
