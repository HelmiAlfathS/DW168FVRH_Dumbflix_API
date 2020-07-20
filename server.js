require('dotenv').config();
const express = require('express');
const app = express();

const router = require('./routes');
var cors = require('cors');
const port = 5000;

app.use(cors());
app.use(express.json());

app.use('/api/v1/uploads', express.static('uploads')); /// srver public
app.use('/api/v1', router);

// middleware;
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: { message: 'You are not authorized.' } });
  } else {
    next(err);
  }
});

app.listen(5000, () =>
  console.log(`Server is running at http://localhost:${port}}`)
);
