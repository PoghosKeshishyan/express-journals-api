const express = require('express');
const router = express.Router();
const { all, year, add, edit, remove } = require('../controllers/years');

router.get('/', all);
router.get('/:year', year);
router.post('/add/:year', add);
router.put('/edit/:year', edit);
router.delete('/remove/:year', remove);

module.exports = router;