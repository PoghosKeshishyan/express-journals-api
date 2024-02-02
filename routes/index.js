const express = require('express');
const router = express.Router();

// Get home page
router.get('/', function (req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
