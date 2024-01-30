const express = require('express');
const router = express.Router();
const checkYearParam = require('../middleware/route');
const { all, byYear, current, add, edit, remove } = require('../controllers/journals');

router.get('/', all);
router.get('/:year', checkYearParam, byYear);
router.get('/current', current);
router.post('/add', add);
router.put('/edit/:id', edit);
router.delete('/remove/:id', remove);

module.exports = router;