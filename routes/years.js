const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { all, year, add, edit, remove } = require('../controllers/years');

router.get('/', all);
router.get('/:year', year);
router.post('/add/:year', auth, add);
router.put('/edit/:year', auth, edit);
router.delete('/remove/:year', auth, remove);

module.exports = router;
