const nodeMailer = require("nodemailer");
const fs = require("fs");

const templates = {
  welcomeTemplate: fs.readFileSync(`${__dirname}/emails/welcome.html`, "utf8"),
  resetPasswordTemplate: fs.readFileSync(
    `${__dirname}/emails/reset-password.html`,
    "utf8"
  ),
};

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = `Coder Hero <${process.env.EMAIL_FORM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === "production") {
      return nodeMailer.createTransport({
        service: "gmail",
        //you should allow less secure app options
        //disable antivirus if had self signed certificate problem
        //https://myaccount.google.com/lesssecureapps
        auth: {
          user: process.env.GMAIL_ADDRESS,
          pass: process.env.GMAIL_PASSWORD,
        },
        tls: { rejectUnauthorized: false },
      });
    }

    return nodeMailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "bo.kohler81@ethereal.email",
        pass: "C21kZ2Bs7gm85ampWM",
      },
      tls: { rejectUnauthorized: false },
    });
  }

  htmlTemplate(template, subject, firstName, url) {
    let html = templates[template];

    html = html.replace(/{SUBJECT}/g, subject);
    html = html.replace(/{FIRST_NAME}/g, firstName);
    html = html.replace(/{URL}/g, url);
    return html;
  }

  async send(template, subject) {
    const html = this.htmlTemplate(template, subject, this.firstName, this.url);
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send(
      "welcomeTemplate",
      "Account activation link (valid for only 10 minutes)"
    );
  }

  async sendPasswordReset() {
    await this.send(
      "resetPasswordTemplate",
      "Your password reset token (valid for only 10 minutes)"
    );
  }
};
