import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';

import appConfigurationMiddleware from './middlewares/appConfigurationMiddleware.js';
import router from './router.js';
import globalErrorHandlerMiddleware from './middlewares/globalErrorHandlerMiddleware.js';
import corsMiddleware from './middlewares/corsMiddleware.js';
import readSwaggerDocument from './docs/readSwaggerDocument.js';
import requestLoggingMiddleware from './middlewares/requestLoggingMiddleware.js';

const api = express();

api.use(appConfigurationMiddleware);
api.use(requestLoggingMiddleware);

api.use(corsMiddleware);

api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());

api.use("/docs", swaggerUi.serve, swaggerUi.setup(readSwaggerDocument()));

api.use(router);

api.use(globalErrorHandlerMiddleware);

const port = process.env.PORT || 3000;

api.listen(port, () => {
  console.log(`Server ready to accept requests on port ${port}`);
});
