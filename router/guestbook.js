const { findAll, postContent } = require('../controllers/guestbookController');
const express = require('express');
const router = express.Router();

router.get('/', findAll)

router.post('/', postContent)

module.exports = router;