import express from 'express';
import bodyParser from 'body-parser';
import { routes } from './routes';
import { db } from './db';

const app = express();
app.get('sas', (req, res) => {});
app.use(bodyParser.json());

routes.forEach((route) => {
  app[route.method](route.path, route.handler);
});

const start = async () => {
  await db.connect('mongodb://localhost:27017');
  await app.listen(8080);
  console.log('Listening on port 8080');
};

start();
