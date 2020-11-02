const express = require('express');
const { requireSignin, userMiddleware } = require('../common-middleware');
const router = express.Router();

const { addItemsToCart } = require('../controller/cart');

router.post('/user/cart/add', requireSignin, userMiddleware, addItemsToCart);

module.exports = router;
