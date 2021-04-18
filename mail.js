"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main(infoForm) {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "samugonza99@gmail.com", // generated ethereal user
      pass: "samudelbsm11", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    to: "gonza92008@homail.com", // list of receivers
    subject: "Samuel Posadas", // Subject line
    text: infoForm
  });

return info.messageId;
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  //   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);

module.exports = {main}