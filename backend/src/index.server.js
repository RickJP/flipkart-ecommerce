const express = require('express');
require('dotenv').config();
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const initialDataRoutes = require('./routes/admin/initialData');
const pageRoutes = require('./routes/admin/page');

const tryoutRoutes = require('./routes/tryout');

const env = process.env;
const port = env.PORT || 3000;

mongoose
  .connect(
    `
    mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PW}@cluster0.gtgv3.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority
`,
    {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
  )
  .then(() => {
    console.log('Database connected');
  });

//app.use(express.json());
app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api', initialDataRoutes);
app.use('/api', pageRoutes);

app.use('/api', tryoutRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
