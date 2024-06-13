const menuItem = require("../model/menuitem");

const addItem = async (req, res) => {
  const item = new menuItem({
    name: req.body.name,
    cost: req.body.cost,
    group: req.body.group,
    cgst: req.body.cgst,
    sgst: req.body.sgst,
  });
  const newitem = await item.save();
  const allitems = await menuItem.find({});
  res.send({ message: "Item Saved Successfully", newitem: allitems });
};

module.exports = addItem;