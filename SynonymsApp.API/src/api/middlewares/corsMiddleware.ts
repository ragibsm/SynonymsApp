import { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import RequestContext from '../types/RequestContext.js';

function corsMiddleware(req: Request, res: Response<any, RequestContext>, next: NextFunction) {
  const corsOptions = {
    origin: function (origin: string | undefined, callback: (err: Error | null, origin: string) => void) {
      if (origin && res.locals.config.Cors.AllowedOrigins.includes(origin)) {
        callback(null, origin);
      } else {
        callback(null, res.locals.config.Cors.AllowedOrigins[0])
      }
    },
    methods: res.locals.config.Cors.Methods,
  };

  const corsMiddlewareReqHandler = cors(corsOptions); 

  return corsMiddlewareReqHandler(req, res, next);
}

export default corsMiddleware;