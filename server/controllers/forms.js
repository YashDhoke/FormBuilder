const Form = require('../models/Form');

exports.createForm = async (req, res) => {
  try {
    const newForm = new Form(req.body);
    await newForm.save();
    res.status(201).json(newForm);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.json(forms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFormById = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    res.json(form);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateForm = async (req, res) => {
  try {
    const form = await Form.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(form);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
