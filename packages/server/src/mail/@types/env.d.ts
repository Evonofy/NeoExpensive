declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SENDER_EMAIL: string;
      SENDER_NAME: string;
    }
  }
}

export {};
