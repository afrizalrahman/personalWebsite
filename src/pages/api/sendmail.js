// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nodemailer from 'nodemailer'
import { google } from 'googleapis'
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.OAUTH_CLIENTID,
  process.env.OAUTH_SECRET,
  "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
  refresh_token: process.env.OAUTH_REFRESHTOKEN
});
const accessToken = oauth2Client.getAccessToken()

const smtpTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
       type: "OAuth2",
       user: process.env.MAIL, 
       clientId:  process.env.OAUTH_CLIENTID,
       clientSecret: process.env.OAUTH_SECRET,
       refreshToken: process.env.OAUTH_REFRESHTOKEN,
       accessToken: accessToken
  }
});

async function sendEmail({ name, email, subject, message }) {
  let messageConstruct = `Name: ${name} \nEmail: ${email} \n\n${message}`
  const emailOptions = {
    from: email,
    to: process.env.MAIL_TO,
    subject: subject,
    text: messageConstruct,
  };

  // 3. This will send the email with the `emailOptions` above.
  return smtpTransport.sendMail(emailOptions);
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const emailRes = await sendEmail(req.body);
    console.log(emailRes)
    if (emailRes.messageId) {
      return res.status(200).json({ message: `Email sent successfuly` });
    }

    return res.status(400).json({ message: 'Error sending email' });
  }

  return res.status(400).json({ message: `Incorrect method: ${req.method}. Did you mean POST?` });
}
