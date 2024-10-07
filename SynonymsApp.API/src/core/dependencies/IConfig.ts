interface IConfig {
  Env: 'development' | 'qa' | 'stage' | 'production';
  LogLevel: 'debug' | 'info' | 'warn' | 'error';
  Cors: {
    AllowedOrigins: string[];
    Methods: ('GET' | 'HEAD' | 'PUT' | 'PATCH' | 'POST' | 'DELETE')[]
  }
}

export default IConfig;