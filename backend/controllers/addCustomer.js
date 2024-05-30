const Customer = require("../model/Customer");

const addCustomer = async (req, res) => {
  const customer = new Customer({
    name: req.body.name,
    id: req.body.id,
    balance: req.body.balance,
  });
  try {
    const newCustomer = await customer.save();
    res.send({
      message: "Customer Added Successfully",
      customers: newCustomer,
    });
  } catch (error) {
    res.json({
      message: "Error in Adding Customer",
      error: error,
    })
  }
};

module.exports = addCustomer;
