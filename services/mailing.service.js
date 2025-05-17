const nodemailer = require('nodemailer');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

// Load environment variables
require('dotenv').config();

// Set up nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_APP_PASS, // Gmail app password
    },
});

// Template loader with placeholder replacement: {{KEY}}
const loadTemplate = (fileName, replacements) => {
    const templatePath = path.join(
        __dirname,
        '../utils/EmailTemplates',
        fileName
    );
    let template = fs.readFileSync(templatePath, 'utf8');
    for (const key in replacements) {
        const placeholder = new RegExp(`{{${key}}}`, 'g');
        template = template.replace(placeholder, replacements[key]);
    }
    return template;
};

// Main function to send verification email
exports.sendVerificationEmail = async user => {
    try {
        // Check if user is already verified
        if (user.emailVerified) {
            return;
        }
        // Generate token
        const rawToken = crypto.randomBytes(32).toString('hex');

        // Optional: Hash token before saving (recommended for added security)
        const hashedToken = crypto
            .createHash('sha256')
            .update(rawToken)
            .digest('hex');

        // Store hashed token and expiry on user
        user.mailVerificationToken = hashedToken;
        user.mailVerificationTokenExpires = Date.now() + 1000 * 60 * 60; // 1 hour
        await user.save();

        // Load HTML email template and inject token in URL
        const html = loadTemplate('VerificationMailTemp.html', {
            YOUR_VERIFICATION_TOKEN: rawToken, // Keep raw token in the email link
        });

        // Send email
        await transporter.sendMail({
            to: user.email,
            subject: 'Verify Your Email',
            html,
        });

    } catch (err) {
        console.error('Error sending verification email:', err);
        throw new Error('Could not send verification email');
    }
};
