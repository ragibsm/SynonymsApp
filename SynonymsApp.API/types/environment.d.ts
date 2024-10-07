declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'qa' | 'stage' | 'production';
      LOG_LEVEL: 'debug' | 'info' | 'warn' | 'error';
    }
  }
}

export {}