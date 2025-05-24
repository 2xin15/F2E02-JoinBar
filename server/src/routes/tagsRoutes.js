const express = require('express');
const { createTag, getTag } = require('../controllers/tagControllers');
// const { createTag, getTag, updateTag, deleteTag } = require('../controllers/tagControllers');

const router = express.Router();

router.post('/createTag', createTag);
router.get('/:id', getTag);
// router.put('/updateTag/:id', updateTag);
// router.delete('/deleteTag/:id', deleteTag);


module.exports = router;