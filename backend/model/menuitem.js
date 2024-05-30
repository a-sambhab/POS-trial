const mongoose = require('mongoose');

const menuItem = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    },
    group: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('menuItem', menuItem);