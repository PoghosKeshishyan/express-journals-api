const express = require('express');
const router = express.Router();
const { contact } = require('../controllers/contact');

router.post('/', contact);

module.exports = router;