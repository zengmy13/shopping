var express = require('express');
var router = express.Router();
var {
    getproducts, getproduct,
    admindeleteproduct, adminupdateproduct, admincreateproduct, choosetopproducts, addreviewtoproduct
} = require("../controller/product")
var {checkuserlogin, isadmin} = require("../middleware/index")

/* GET home page. */
router.get('/api/products', getproducts);
router.get('/api/product/:id', getproduct);
router.get("/config/pay", (req, res, next) => {
    res.send("Ab0keKn57H27uecvtw-WQzSbNtBLedimPWtxcIwpWTZJNJXPf6bVfiDNCs_m88CzzTXdo8ug43UXdiwO")
})
router.delete("/api/product/:id", checkuserlogin, isadmin, admindeleteproduct)
router.put("/api/product/:id", checkuserlogin, isadmin, adminupdateproduct)
router.post("/api/product", checkuserlogin, isadmin, admincreateproduct)
router.get("/api/products/top", choosetopproducts)
router.post("/api/product/:id/review", checkuserlogin, addreviewtoproduct);


module.exports = router;
