const express = require('express');
const router = express.Router();
const {checkUserLogin, isAdmin} = require("../middleware/index");
const {createOrder, getOrderById, getUserOrders, updateOrderToPay, adminGetAllOrders, changeDeliver} = require("../controller/order");


/* GET users listing. */
router.get('/allOrders', checkUserLogin, getUserOrders)
router.post('/create', checkUserLogin, createOrder)
router.get('/:id', checkUserLogin, getOrderById)
router.put('/:id', checkUserLogin, updateOrderToPay)
router.get('/admin/all', checkUserLogin, isAdmin, adminGetAllOrders)
router.put('/:id/deliver', checkUserLogin, isAdmin, changeDeliver)


module.exports = router;