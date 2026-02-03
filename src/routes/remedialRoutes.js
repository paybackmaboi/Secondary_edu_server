const express = require('express');
const router = express.Router();
const remedialController = require('../controllers/remedialController');

router.post('/', remedialController.createRemedialClass);
router.get('/student/:studentId', remedialController.getRemedialsByStudent);
router.put('/:id', remedialController.updateRemedialClass);

module.exports = router;
