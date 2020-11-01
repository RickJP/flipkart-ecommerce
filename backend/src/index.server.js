const express = require('express');
require('dotenv').config();
const app = express();
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');

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
app.use(express.json());
app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
