import nodemailer from 'nodemailer';

interface EmailOptions {
    email: string;
    subject: string;
    otp: string;
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

export const sendOTPEmail = async ({ email, subject, otp }: EmailOptions): Promise<boolean> => {
    try {
        const mailOptions = {
            from: `"DoorMandi" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: subject,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <h1 style="color: #2c3e50; margin: 0;">DoorMandi</h1>
                        <p style="color: #7f8c8d; margin: 5px 0;">Your Trusted Online Marketplace</p>
                    </div>
                    
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
                        <h2 style="color: #2c3e50; margin: 0 0 15px 0;">Verification Code</h2>
                        <p style="color: #34495e; margin: 0 0 15px 0;">Please use the verification code below to complete your action:</p>
                        <div style="background-color: #ffffff; padding: 10px; text-align: center; border-radius: 5px;">
                            <h1 style="color: #e67e22; letter-spacing: 5px; margin: 0;">${otp}</h1>
                        </div>
                        <p style="color: #7f8c8d; font-size: 0.9em; margin: 15px 0 0 0;">This code will expire in 10 minutes.</p>
                    </div>
                    
                    <div style="color: #7f8c8d; font-size: 0.8em; text-align: center;">
                        <p>If you didn't request this code, please ignore this email.</p>
                        <p>© ${new Date().getFullYear()} DoorMandi. All rights reserved.</p>
                    </div>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};