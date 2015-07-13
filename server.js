import express from 'express';
import defineRoutes from './routes';
 
const app  = express();
defineRoutes(app);
 
const port = 3000;
const server = app.listen(port, () => {
  console.log(`Started at http://localhost:${port}`);
});