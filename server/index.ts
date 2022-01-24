const express = require('express');

const app = express();
const port = 3000;
const cors = require('cors');
const db = require('./db');
const router = require('./router');

app.use(cors());
app.use(express.json());
app.use(router);

// eslint-disable-next-line no-unexpected-multiline

app.listen(port, () => {
  db;
  console.log(`Server listening at http://localhost:${port}`);
});
