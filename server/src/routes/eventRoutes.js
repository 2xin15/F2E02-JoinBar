const express = require('express');
const { createEvent, getEvent, updateEvent } = require('../controllers/eventControllers');

const router = express.Router();

router.post('/create', createEvent);
router.get('/:id', getEvent);
router.put('/update/:id', updateEvent);


module.exports = router;