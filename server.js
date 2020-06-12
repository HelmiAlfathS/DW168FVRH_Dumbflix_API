require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./routes');

app.use(express.json());

app.use('/api/v1', router);

//middleware
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: { message: 'You are not authorized.' } });
  } else {
    next(err);
  }
});

app.listen(3000, () =>
  console.log(`Server is running at http://localhost:3000}`)
);
