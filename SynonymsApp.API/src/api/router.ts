import { Router, Request, Response, NextFunction } from 'express';
import RequestContext from './types/RequestContext.js';

const router = Router();

router.get('/v1/synonyms/:word', (req: Request, res: Response<any, RequestContext>) => {
  const synonyms = res.locals.services.synonyms.GetAll(req.params.word, req.query.applyTransitiveRule === 'true');
  res.send({ synonyms });
});

router.post('/v1/synonyms', (req: Request, res: Response<any, RequestContext>) => {
  res.locals.services.synonyms.Create(req.body);
  res.setHeader('Location', `/v1/synonyms/${req.body.word}`);
  res.status(201).send();
});

router.use('*', (_req: Request, res: Response, _next: NextFunction) => {
  res.status(404).send({ message: "Route not found" });
});

export default router;