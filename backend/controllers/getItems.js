const menuItem = require("../model/menuitem");

const getItems = async (req, res) => {
  const allitems = await menuItem.find({});
  res.send({ message: "Items Fetched Successfully", items: allitems });
};

module.exports = getItems;