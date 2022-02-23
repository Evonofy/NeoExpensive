export const port = Number(process.env.PORT) || 3333;
export const isProduction = process.env.NODE_ENV === 'production';
export const mailConfig = {
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  user: process.env.MAIL_USER,
  pass: process.env.MAIL_PASS,
};
