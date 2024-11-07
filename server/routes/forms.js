const express = require('express');
const { createForm, getAllForms, getFormById, updateForm } = require('../controllers/forms');
const router = express.Router();

router.post('/create', createForm);
router.get('/', getAllForms);
router.get('/:id', getFormById);
router.put('/:id/edit', updateForm);

module.exports = router;
