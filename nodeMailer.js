const express = require("express");
const nodemailer = require("nodemailer");
const nodeMailer = express();

// Middleware to parse JSON body
nodeMailer.use(express.json());

// Endpoint to handle form submission
nodeMailer.post("/send-email", (req, res) => {
  const { name, email, subject, message } = req.body;

  // Create a transporter with your email service configuration
  const transporter = nodemailer.createTransport({
    host: "smtp.elasticemail.com",
    port: 2525,
    auth: {
      user: "sandeepbh0502@gmail.com",
      pass: "894AE55CE2B0B826FB9C4529D6133356506F",
    },
  });

  // Set up email content
  const mailOptions = {
    from: email,
    to: "sandeepbhagat05022003@gmail.com",
    subject,
    text: `
      Name: ${name}
      Email: ${email}
      Message: ${message}
    `,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send("An error occurred while sending the email.");
    } else {
      console.log("Email sent: " + info.response);
      res.send("Email sent successfully.");
    }
  });
});

module.exports = nodeMailer;
