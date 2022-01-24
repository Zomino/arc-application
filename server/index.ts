import express from 'express';
import cors from 'cors';
import router from './router';
import db from './db';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(port, () => {
  db;
  console.log(`Server listening at http://localhost:${port}`);
});
