const express = require('express');
const router = express.Router();
const {
    getProducts, getProduct, adminDeleteProduct, adminUpdateProduct, adminCreateProduct, chooseTopProducts,
    addReviewToProduct
} = require("../controller/product")
const {checkUserLogin, isAdmin} = require("../middleware/index")

/* GET home page. */
router.get('/api/products', getProducts);
router.get('/api/product/:id', getProduct);
router.get("/config/pay", (req, res, next) => {
    res.send("Ab0keKn57H27uecvtw-WQzSbNtBLedimPWtxcIwpWTZJNJXPf6bVfiDNCs_m88CzzTXdo8ug43UXdiwO")
})
router.delete("/api/product/:id", checkUserLogin, isAdmin, adminDeleteProduct)
router.put("/api/product/:id", checkUserLogin, isAdmin, adminUpdateProduct)
router.post("/api/product", checkUserLogin, isAdmin, adminCreateProduct)
router.get("/api/products/top", chooseTopProducts)
router.post("/api/product/:id/review", checkUserLogin, addReviewToProduct);


module.exports = router;
