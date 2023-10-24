import { createTransport } from "nodemailer";

export const sendEmail = async (to: string | string[], subject: string, message: string, html: string) => {
  try {
    const { EMAIL, EMAIL_PASSWORD } = process.env;
    const transport = createTransport({
      service: "gmail",
      auth: {
        user: EMAIL,
        pass: EMAIL_PASSWORD
      }
    });
    await transport.sendMail({
      to,
      subject,
      text: message,
      html: html,
      from: process.env.EMAIL
    });
    return true;
  } catch (error) {
    throw error;
  }
};
