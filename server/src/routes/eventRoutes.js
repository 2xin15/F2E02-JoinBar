const express = require('express');
const { createEvent } = require('../controllers/eventControllers');

const router = express.Router();

router.post('/create', createEvent);

module.exports = router;