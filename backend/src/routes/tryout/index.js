const express = require('express');
const router = express.Router();
const { getBilingualDocs } = require('../../controller/tryout');

router.get('/tryout/bilingual', getBilingualDocs);

module.exports = router;
