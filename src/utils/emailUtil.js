const nodemailer = require('nodemailer');
const config=require('../configs/config');
const EMAIL_SERVICE=config.EMAIL_SERVICE;
const EMAIL_USER=config.EMAIL_USER;
const EMAIL_PASS=config.EMAIL_PASS;
const EMAIL_FROM=config.EMAIL_FROM;

// Function to send email notification
async function sendEmail(recipient, subject, message) {
    // Create a transporter using SMTP
    let transporter = nodemailer.createTransport({
        service: EMAIL_SERVICE,
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS
        }
    });

    // Email options
    let mailOptions = {
        from: EMAIL_FROM,
        to: recipient,
        subject: subject,
        text: message
    };

    // Send email
    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return info.response;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

// Function to generate message for scheduled job
function scheduledMessage(jobId) {
    return `Dear user, your job ${jobId} has been scheduled.`;
}

// Function to generate message for not scheduled job
function notScheduledMessage(jobId) {
    return `Dear user, your job ${jobId} could not be scheduled.`;
}

module.exports = {
    sendEmail,
    scheduledMessage,
    notScheduledMessage
};
