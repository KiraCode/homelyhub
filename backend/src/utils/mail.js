import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendMail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Homely Hub",
      link: "https://homelyhub.vercel.com",
    },
  });

  const emailBody = mailGenerator.generate(options.mailGenContent);
  const emailText = mailGenerator.generate(options.mailGenContent);

  // nodemailer starts
  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  });

  const mail = {
    from: "<hello@hmelyhub.in>",
    to: options.email,
    text: emailText,
    html: emailBody,
  };

  try {
    await transporter.sendMail(mail);
  } catch (error) {
    console.error("Email Failed", error);
  }
};

// factory function
const forgotPasswordMailGenContent = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      intro:
        "Welcome to Homely Hub website! We're very excited to have you on board. Let's try to reset your password",
      action: {
        instructions: "To get started with Mailgen, please click here:",
        button: {
          color: "@22BC66", //optional action button color
          text: "Reset Your Password",
          link: passwordResetUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help",
    },
  };
};

export { sendMail, forgotPasswordMailGenContent };
