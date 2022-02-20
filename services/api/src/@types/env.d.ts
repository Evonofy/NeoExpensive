declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      PORT: string;
      CLIENT_URL: string;
      DATABASE_URL: string;
    }
  }
}

export {};
