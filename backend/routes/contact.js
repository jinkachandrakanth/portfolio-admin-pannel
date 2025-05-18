import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

// Configure nodemailer transporter (replace with your email service details)
const transporter = nodemailer.createTransport({
    service: 'gmail', // e.g., 'gmail', 'outlook', etc.
    auth: {
        user: process.env.EMAIL_USER, // Your email address from environment variables
        pass: process.env.EMAIL_PASS  // Your email password or app password from environment variables
    }
});

// @route   POST /api/contact
// @desc    Send contact form message
// @access  Public
router.post('/', async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Validate input (basic check)
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ msg: 'Please fill in all fields' });
    }

    const mailOptions = {
        from: process.env.EMAIL_USER, // Sender address
        to: process.env.EMAIL_USER, // Your email address to receive messages
        subject: `New Contact Form Message: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    };

    try {
        // Send email
        await transporter.sendMail(mailOptions);

        console.log('Email sent successfully');
        res.status(200).json({ msg: 'Message sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ msg: 'Failed to send message' });
    }
});

export default router; 