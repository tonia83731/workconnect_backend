const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

const mailOpts = (email, subject, text) => {
  return {
    from: process.env.GMAIL_USER,
    to: email,
    subject,
    text,
  };
};

const nodeMailer = (name, email, subject, text) => {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject,
    text: `Dear ${name},
    \n\n${text}
    
    \n\nBest regards,
    \nThe Workconnect Team
    `,
  };
  // consider try...catch...
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("Error: ", err);
    } else {
      console.log("Email sent: ", info.response);
    }
  });
};

module.exports = {
  nodeMailer,
};

// https://israynotarray.com/nodejs/20230722/1626712457/
