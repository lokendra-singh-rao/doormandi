import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendEmail = async ({ email, subject, message }: { email: string; subject: string; message: string }): Promise<boolean> => {
  try {
    const mailOptions = {
      from: `"DoorMandi" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: subject,
      html: message,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

export const sendOTPEmail = async ({ email, subject, verificationUrl }: { email: string; subject: string; verificationUrl: string }): Promise<boolean> => {
  const message = `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <h1 style="color: #2c3e50; margin: 0;">DoorMandi</h1>
                    <p style="color: #7f8c8d; margin: 5px 0;">Your Trusted Online Marketplace</p>
                </div>
                
                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
                    <p style="color: #34495e; margin: 0 0 15px 0;">Please click the button below to verify your email:</p>
                    
                    <!-- Verification Button -->
                    <div style="text-align: center; margin: 20px 0;">
                        <a href="${verificationUrl}" style="background-color: #22C55E; color: #ffffff; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-weight: bold; display: inline-block;">Verify Email</a>
                    </div>

                    <p style="color: #34495e; margin: 0;">Or copy and paste the following link into your browser if the button doesn’t work:</p>
                    
                    <!-- Direct Link -->
                    <div style="background-color: #ffffff; padding: 10px; border-radius: 5px; text-align: center; margin-top: 10px; word-wrap: break-word;">
                        <a href="${verificationUrl}" style="color: #3498db; word-break: break-all;">
                            ${verificationUrl}
                        </a>
                    </div>

                    <p style="color: #7f8c8d; font-size: 0.9em; margin: 15px 0 0 0;">This code will expire in 10 minutes.</p>
                </div>
                
                <div style="color: #7f8c8d; font-size: 0.8em; text-align: center;">
                    <p>If you didn’t request this code, please ignore this email.</p>
                    <p>© ${new Date().getFullYear()} DoorMandi. All rights reserved.</p>
                </div>
            </div>`;
  return await sendEmail({email, subject, message});
};

export const sendWelcomeEmail = async ({ email }: { email: string }): Promise<boolean> => {
  const subject = "Welcome to DoorMandi";
  const message = `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
                      <div style="text-align: center; margin-bottom: 20px;">
                          <h1 style="color: #2c3e50; margin: 0;">DoorMandi</h1>
                          <p style="color: #7f8c8d; margin: 5px 0;">Your Trusted Online Marketplace</p>
                      </div>
                      
                      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
                          <h2 style="color: #2c3e50; margin: 0 0 15px 0; text-align: center;">Email Verified Successfully</h2>
                          <p style="color: #34495e; margin: 0 0 15px 0;">
                              Congratulations! Your email address has been successfully verified. You can now enjoy full access to all features of DoorMandi.
                          </p>
                          
                          <!-- Call-to-Action Button -->
                          <div style="text-align: center; margin: 20px 0;">
                              <a href="http://localhost:3000/login" style="background-color: #22C55E; color: #ffffff; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-weight: bold; display: inline-block;">Go to Login</a>
                          </div>

                          <p style="color: #34495e; margin: 0;">
                              Click the button above to access your dashboard and explore our services. If you have any questions, feel free to reach out to our support team.
                          </p>
                      </div>
                      
                      <div style="color: #7f8c8d; font-size: 0.8em; text-align: center;">
                          <p>Thank you for verifying your email with DoorMandi.</p>
                          <p>© ${new Date().getFullYear()} DoorMandi. All rights reserved.</p>
                      </div>
                  </div>`;
  return await sendEmail({ email, subject, message });

};
