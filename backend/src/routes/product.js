const express = require('express');
const {
  requireSignin,
  adminMiddleware,
  upload,
} = require('../common-middleware');
const {
  createProduct,
  getProductsBySlug,
  getProductDetailsById,
} = require('../controller/product');

const router = express.Router();

router.post(
  '/product/create',
  requireSignin,
  adminMiddleware,
  upload.array('productPictures'),
  createProduct,
);
router.get('/products/:slug', getProductsBySlug);

router.get('/product/:productId', getProductDetailsById);
// const multer = require('multer');

// const shortId = require('shortid');
// const path = require('path');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(path.dirname(__dirname), 'uploads'));
//   },
//   filename: function (req, file, cb) {
//     cb(null, shortId.generate() + '-' + file.originalname);
//   },
// });

// const upload = multer({ storage });

//router.get('/product/get', getProduct);

module.exports = router;
