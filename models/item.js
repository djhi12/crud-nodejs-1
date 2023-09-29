const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    // Define your schema fields and validation rules here
    name: {
        type: String,
        required: true,
    },
    description: String,
    // Add more fields as needed
});

module.exports = mongoose.model('Item', itemSchema);
