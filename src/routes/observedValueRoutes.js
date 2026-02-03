const express = require('express');
const router = express.Router();
const observedValueController = require('../controllers/observedValueController');

router.post('/', observedValueController.addValue);
router.get('/student/:studentId', observedValueController.getValuesByStudent);
router.put('/:id', observedValueController.updateValue);

module.exports = router;
