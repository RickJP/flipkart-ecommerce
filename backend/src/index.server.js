const express = require('express');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');

const env = process.env;
const port = env.PORT || 3000;

mongoose
  .connect(
    `
    mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PW}@cluster0.gtgv3.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority
`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
  )
  .then(() => {
    console.log('Database connected');
  });

//app.use(express.json());
app.use(bodyParser.json());
app.use('/api', userRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
