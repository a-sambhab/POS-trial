const Customer = require("../model/Customer")

const updateCustomer = async(req, res) => {
    const response = await Customer.findOneAndUpdate({id: req.body.id}, { $inc: {balance: req.body.balance}})
    const customer = await Customer.findOne({id: req.body.id});
    res.json(customer);
}

module.exports = updateCustomer;