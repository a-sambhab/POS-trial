const mongoose = require("mongoose");

const Sales = new mongoose.Schema({
    salesID: {
        type: Number,
        required: true,
    },
    customerID: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    content: {
        type: Array,
        required: true,
    },
    discount: {
        type: Number,
        default: 0
    },
    salestype: {
        type: String,
        enum: ["credit", "paid"],
    },
    extracharges: {
        type: Number,
        default: 0,
    },
    totalBill: {
        type: Number,
        required: true,
    }

})

module.exports = mongoose.model("Sales", Sales);