const express = require('express');
require('dotenv');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'hi from server',
  });
});

app.post('/data', (req, res) => {
  res.status(200).json({
    message: req.body,
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
