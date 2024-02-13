import 'dotenv/config';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import swagger from './swagger';
import swaggerJsdoc from 'swagger-jsdoc';
import express from 'express';
const PORT = process.env.PORT || 3002;
const NODE_ENV = process.env.NODE_ENV || 'dev';
import { router } from './route';
import { AppDataSource } from './data-source';

const app = express();
app.use(express.json()); // gets data in json
app.use(cors());

app.use(router);

app.use(
  '/api/documentation',
  swaggerUI.serve,
  swaggerUI.setup(swaggerJsdoc(swagger))
);

if (NODE_ENV !== 'test') {
  app.listen(PORT);
}

AppDataSource.initialize().catch((error) => console.log(error));

export { app };
