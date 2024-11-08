const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        default: "Untitled Form",
    },
    inputs: [
        {
            type: {
                type: String,
                enum: ['email', 'text', 'password', 'number', 'date'],
                required: true,
            },
            title: String,  
            placeholder: String, 
            readOnly: { type: Boolean, default: true },
        },
    ],
});

module.exports = mongoose.model('Form', formSchema);
