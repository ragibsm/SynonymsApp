import SynonymsRepository from '../src/dependencies/repositories/SynonymsRepository.js';
import WinstonLogger from '../src/dependencies/logger/WinstonLogger.js';

const synonymsRepository = new SynonymsRepository();

function createDependencies() {
  const logger = new WinstonLogger('error');

  return {
    synonymsRepository,
    logger
  };
}

export default createDependencies;