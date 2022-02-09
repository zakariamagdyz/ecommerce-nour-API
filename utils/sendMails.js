const nodemailer = require("nodemailer");

module.exports = async (options) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "blaise.waters55@ethereal.email",
      pass: "3J4svNfuQaJk6aMnzy",
    },
  });
  const mailOptions = {
    from: "<zakaria magdy>",
    to: options.to,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};
