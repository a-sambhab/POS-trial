const Customers = require("../model/Customer");

const getCustomers = async(req,res) => {
    const allCustomers = await Customers.find({});
    res.send({ message: "Customers Fetched Successfully", Customers: allCustomers });
}

module.exports = getCustomers;