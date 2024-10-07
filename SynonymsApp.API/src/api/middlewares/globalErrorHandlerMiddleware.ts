import { Request, Response, NextFunction } from 'express';
import RequestContext from '../types/RequestContext.js';
import ValidationError from '../../core/util/ValidationError.js';

function globalErrorHandlerMiddleware(error: Error, req: Request, res: Response<any, RequestContext>, next: NextFunction) {
  
  if (error instanceof ValidationError) {
    res.locals.logger.error('Validation error occured', { error });
    res.status(400).send({ message: 'Bad request', details: error.Details });
    return;
  }

  res.locals.logger.error('Internal server error occured', { message: error.message, stack: error.stack });
  res.status(500).send({ message: 'Internal server error!' });

}

export default globalErrorHandlerMiddleware;