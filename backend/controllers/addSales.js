const Sales = require("../model/sales");
const Customers = require("../model/Customer");

const addSales = async (req, res) => {
  const newsale = new Sales({
    salesID: new Date(),
    customerID: req.body.customerid,
    content: req.body.content,
    salestype: req.body.salestype,
    totalBill: req.body.totalBill,
  });
  if(req.body.salestype === "paid"){
    newsale.paymenttype = req.body.paymenttype;
  }
  if (req.body.extracharges !== undefined) {
    newsale.extracharges = req.body.extracharges;
  }
  if (req.body.discount !== undefined) {
    newsale.discount = req.body.discount;
  }
  try {
    if (req.body.salestype === "credit") {
      const updateUserBalance = await Customers.findOneAndUpdate(
        { id: req.body.customerid },
        { $inc: { balance: -req.body.totalBill } }
      );
    }
    const saveSale = await newsale.save();
    res.json({ message: "Sale Added Successfully", sale: saveSale, user: await Customers.findOne({id: req.body.customerid}) });
  } catch (error) {
    res.json({ message: "Error Saving Sale", error: error });
  }
};

module.exports = addSales;
