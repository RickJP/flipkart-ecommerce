const express = require('express');
const { requireSignin, userMiddleware } = require('../common-middleware');
const { addAddress, getAddress } = require('../controller/address');
const router = express.Router();

router.get('/user/address', requireSignin, userMiddleware, getAddress);
router.post('/user/address', requireSignin, userMiddleware, addAddress);

module.exports = router;
