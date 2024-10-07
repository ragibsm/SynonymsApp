import { Request, Response, NextFunction } from 'express';

import SynonymsRepository from '../../dependencies/repositories/SynonymsRepository.js';
import Config from '../../dependencies/config/Config.js';
import WinstonLogger from '../../dependencies/logger/WinstonLogger.js';
import SynonymsService from '../../core/services/SynonymsService/SynonymsService.js';
import RequestContext from '../types/RequestContext.js';

const synonymsRepository = new SynonymsRepository();
const config = new Config();

function appConfigurationMiddleware(req: Request, res: Response<any, RequestContext>, next: NextFunction) {
  const logger = new WinstonLogger(config.LogLevel);
  const synonymsService = new SynonymsService(synonymsRepository, logger);

  res.locals = {
    services: {
      synonyms: synonymsService
    },
    config,
    logger
  };

  next();
}

export default appConfigurationMiddleware;