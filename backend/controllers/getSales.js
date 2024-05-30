const Sales = require("../model/sales");

const getSales = async(req,res) => {
    const filter = {}
    if(req.query.month!==undefined&&req.query.year!==undefined){
        filter.date = {$gte: new Date(req.query.year, req.query.month-1, 1), $lt: new Date(req.query.year, req.query.month, 0)};
        delete req.query.month;
        delete req.query.year;
    }
    for(const key in req.query){
        filter[key] = req.query[key];
    }
    const getresults = await Sales.find(filter);
    res.json({"message": "Fetched Successfully", sales: getresults});
}

module.exports = getSales;