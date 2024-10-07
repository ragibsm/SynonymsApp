import SynonymsService from '../../core/services/SynonymsService/SynonymsService.js';
import IConfig from '../../core/dependencies/IConfig.js';
import ILogger from '../../core/dependencies/ILogger.js';

type RequestContext = {
  services: {
    synonyms: SynonymsService;
  };
  config: IConfig;
  logger: ILogger;
}

export default RequestContext;