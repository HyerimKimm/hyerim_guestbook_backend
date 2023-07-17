const { findAll, postContent } = require('../controllers/guestbookController');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

router.get('/', findAll)

router.post('/', upload.single('file'), postContent)

module.exports = router;