const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { all, jorunal, byYear, lastThree, add, edit, remove } = require('../controllers/journals');

router.get('/', all);
router.get('/last-three', lastThree);
router.get('/:id', jorunal);
router.get('/year/:year', byYear);
router.post('/add', auth, add);
router.put('/edit/:id', auth, edit);
router.delete('/remove/:id', auth, remove);

module.exports = router;
