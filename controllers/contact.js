const nodemailer = require('nodemailer');

const contact = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            service: 'gmail',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_LOGIN,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_LOGIN,
            to: 'info@barilur.org',
            subject: 'Feedback Form',
            text:
                `This message was sent from:
                http://barilur.org/feedback.html
                ------------------------------------------------------------
                Name of sender: ${name}
                Email of sender: ${email}
                IP address of sender: ${req.ip}
                ------------------------- MESSAGE -------------------------
                ${message}
                -----------------------------------------------------------
                `,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({
            success: true,
            message: 'Շնորհակալություն հաղորդագրության համար'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Произошла ошибка при отправке письма' });
    }
};

module.exports = { contact };
