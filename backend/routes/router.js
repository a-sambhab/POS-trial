const router = require("express").Router();
const addItem = require("../controllers/addItem");
const addCustomer = require("../controllers/addCustomer");
const getItems = require("../controllers/getItems");
const getCustomers = require("../controllers/getCustomers");
const addSales = require("../controllers/addSales");
const getSales = require("../controllers/getSales");
const updateCustomer = require("../controllers/updateCustomer");

router.post("/addItem", addItem);
router.get("/getItems", getItems);
router.post("/addCustomer", addCustomer);
router.get("/getCustomers", getCustomers);
router.post("/addSales", addSales);
router.get("/getSales", getSales);
router.put("/updateCustomer", updateCustomer);

module.exports = router;
