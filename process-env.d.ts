declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TELE_BOT_TOKEN: string;
      // add more environment variables and their types here
    }
  }
}
