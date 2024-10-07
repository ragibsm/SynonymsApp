import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

import IConfig from '../../core/dependencies/IConfig.js';

class Config implements IConfig {
  public Env: 'development' | 'qa' | 'stage' | 'production';
  public LogLevel!: 'debug' | 'info' | 'warn' | 'error';
  public Cors!: {
    AllowedOrigins: string[];
    Methods: ('GET' | 'HEAD' | 'PUT' | 'PATCH' | 'POST' | 'DELETE')[];
  };

  constructor() {
    this.Env = process.env.NODE_ENV ?? 'development';
    
    const __filename = fileURLToPath(import.meta.url);
    var config = <IConfig>JSON.parse(fs.readFileSync(path.join(path.dirname(__filename), `config.${this.Env}.json`), 'utf8'));

    this.LogLevel = process.env.LOG_LEVEL ?? config.LogLevel
    this.Cors = config.Cors;
  }
}

export default Config;