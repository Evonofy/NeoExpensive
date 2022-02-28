declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      PORT: string;
      CLIENT_URL: string;
      DATABASE_URL: string;
      MAIL_HOST: string;
      MAIL_PORT: string;
      MAIL_USER: string;
      MAIL_PASS: string;
      MAIL_SENDER_EMAIL: string;
      ADMIN_CODE: string;
      ACCESS_TOKEN_SECRET: string;
      REFRESH_TOKEN_SECRET: string;
      GITHUB_CLIENT_ID: string;
      GITHUB_CLIENT_SECRET: string;
    }
  }
}

export {};
