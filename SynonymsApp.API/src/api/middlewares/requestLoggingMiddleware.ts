import { Request, Response, NextFunction, query } from 'express';
import RequestContext from '../types/RequestContext.js';

function requestLoggingMiddleware(req: Request, res: Response<any, RequestContext>, next: NextFunction) {
  res.locals.logger.info(`${req.method} ${req.originalUrl}`);
  var startAt = process.hrtime();

  res.on('finish', () => {
    var end = process.hrtime(startAt);
    const timeInMs = Math.round((end[0]* 1000000000 + end[1]) / 1000000);
    res.locals.logger.info(`${req.method} ${req.originalUrl} ${timeInMs}ms`);
  });

  next();
}

export default requestLoggingMiddleware;