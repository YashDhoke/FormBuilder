const express = require('express');
const { createForm, getAllForms, getFormById, updateForm , deleteForm } = require('../controllers/forms');
const router = express.Router();

router.post('/create', createForm);
router.get('/', getAllForms);
router.get('/:id', getFormById);
router.put('/:id', updateForm);
router.delete('/:id', deleteForm);

module.exports = router;
