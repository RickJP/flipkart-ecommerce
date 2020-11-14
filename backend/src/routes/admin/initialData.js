const express = require('express');
const { adminMiddleware, requireSignin } = require('../../common-middleware');
const { initialData } = require('../../controller/admin/initialData');
const router = express.Router();

router.post('/initialdata', requireSignin, adminMiddleware, initialData);

module.exports = router;
