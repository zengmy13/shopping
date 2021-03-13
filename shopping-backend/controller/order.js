var Order = require('../models/order');
var asyncHandler = require('express-async-handler')
var createorder = asyncHandler(async (req, res) => {
    const {
        shippingaddress, orderitems, paymentmethod
        , totalprice, taxprice, shippingprice, itemsprice
    } = req.body;
    const order = await new Order({
        user: req.user._id,
        shippingaddress,
        orderitems,
        paymentmethod,
        totalprice,
        taxprice,
        shippingprice,
        itemsprice
    })
    if (orderitems.length === 0) {
        res.status(404);
        throw new Error("no order items");
        return;
    }
    const neworder = await order.save();
    if (neworder) {
        res.json(neworder)
    }
})


const getorderbyid = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email")
    if (order) {
        res.json(order)
    } else {
        res.status(404);
        throw new Error("not found order")
    }
})

const updateordertopay = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    order.ispaid = true || order.ispaid;
    order.paidat = Date.now();
    order.paymentresult.id = req.body.id;
    order.paymentresult.update_time = req.body.update_time;
    order.paymentresult.status = req.body.status;
    order.paymentresult.email_address = req.body.email_address;
    const updatedorder = await order.save();
    if (updatedorder) {
        res.json(updatedorder)
    } else {
        res.status(404);
        throw new Error("not found order")
    }
})

const getuserorders = asyncHandler(async (req, res, next) => {
    const orders = await Order.find({
        user: req.user._id
    })
    if (orders) {
        res.json(orders)
    } else {
        res.status(404);
        throw new Error("not found order")
    }
})


const admingetallorders = asyncHandler(async (req, res, next) => {
    const orders = await Order.find({}).populate("user", "id name")
    if (orders) {
        res.json(orders)
    } else {
        res.status(404);
        throw new Error("not found orders")
    }
})


const changedeliver = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        order.deliver = true;
        order.deliverat = Date.now();
        const updateorder = await order.save();
        res.json(updateorder);
    } else {
        res.status(404);
        throw new Error("not found order")
    }
})


module.exports = {
    createorder, getorderbyid, updateordertopay, getuserorders, admingetallorders, changedeliver
}