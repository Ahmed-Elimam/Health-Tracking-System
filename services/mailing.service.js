const nodemailer = require("nodemailer");
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_APP_PASS, // You must enable "App Passwords"
  },
});
const loadTemplate = (fileName, replacements) => {
    let template = fs.readFileSync(path.join(__dirname, '../utils/EmailTemplates', fileName), 'utf8');
    for (const key in replacements) {
      const placeholder = `{{${key}}}`;
      template = template.replace(new RegExp(placeholder, 'g'), replacements[key]);
    }
    return template;
  };
exports.sendVerificationEmail = async (user) => {
  const token = crypto.randomBytes(32).toString("hex");
  user.verificationTokenExpires = Date.now() + 1000 * 60 * 60; // 1 hour from now
  user.verificationToken = token;
  await user.save();
  const html = loadTemplate("VerificationMailTemp.html", { "YOUR_VERIFICATION_TOKEN":token }) //template.replace("YOUR_VERIFICATION_TOKEN", token);
  await transporter.sendMail({
    to: user.email,
    subject: "Verify Your Mail",
    html,
  });
};
