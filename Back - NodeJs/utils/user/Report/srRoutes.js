const express = require('express');
const router = express.Router();
const Search = require('./searchEmail');

router.post('/', Search.searchEmail);


module.exports = router;