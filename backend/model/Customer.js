const mongoose = require("mongoose");

const Customer = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
        index: {unique: true},
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = mongoose.model("Customer", Customer);