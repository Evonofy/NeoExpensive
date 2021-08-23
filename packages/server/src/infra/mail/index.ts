const host = process.env.MAILTRAP_MAIL_HOST;
const port = Number(process.env.MAILTRAP_MAIL_PORT!);
const user = process.env.MAILTRAP_MAIL_USER!;
const pass = process.env.MAILTRAP_MAIL_PASS!;

const senderName = process.env.MAILTRAP_MAIL_SENDER_NAME;
const senderEmail = process.env.MAILTRAP_MAIL_SENDER_EMAIL;

const noReplySenderName = process.env.MAILTRAP_NO_REPLY_MAIL_SENDER_NAME;
const noReplySenderEmail = process.env.MAILTRAP_NO_REPLY_MAIL_SENDER_EMAIL;

const sender = {
  name: senderName,
  email: senderEmail,
  noReply: {
    name: noReplySenderName,
    email: noReplySenderEmail
  }
};

const config = {
  host,
  port,
  user,
  pass
};

export default config;

export { sender };
