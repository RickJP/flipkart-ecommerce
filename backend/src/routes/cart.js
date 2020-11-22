const express = require('express');
const { requireSignin, userMiddleware } = require('../common-middleware');
const router = express.Router();

const { addItemsToCart, getCartItems } = require('../controller/cart');

router.post('/user/cart/add', requireSignin, userMiddleware, addItemsToCart);

router.get('/user/cart/get', requireSignin, userMiddleware, getCartItems);

module.exports = router;
