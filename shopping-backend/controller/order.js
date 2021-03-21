const Order = require('../models/order');
const asyncHandler = require('express-async-handler');

const createOrder = asyncHandler(async (req, res) => {
    const {
        shippingAddress, orderItems, paymentMethod
        , totalPrice, taxPrice, shippingPrice, itemsPrice
    } = req.body;
    const order = await new Order({
        user: req.user._id,
        shippingAddress,
        orderItems,
        paymentMethod,
        totalPrice,
        taxPrice,
        shippingPrice,
        itemsPrice
    })
    if (orderItems.length === 0) {
        res.status(404);
        throw new Error("no order items");
    }
    const newOrder = await order.save();
    if (newOrder) {
        res.json(newOrder)
    }
});


const getOrderById = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email")
    if (order) {
        res.json(order)
    } else {
        res.status(404);
        throw new Error("not found order")
    }
})

const updateOrderToPay = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    order.ispaid = true || order.ispaid;
    order.paidat = Date.now();
    order.paymentresult.id = req.body.id;
    order.paymentresult.update_time = req.body.update_time;
    order.paymentresult.status = req.body.status;
    order.paymentresult.email_address = req.body.email_address;
    const updatedOrder = await order.save();
    if (updatedOrder) {
        res.json(updatedOrder)
    } else {
        res.status(404);
        throw new Error("not found order")
    }
})

const getUserOrders = asyncHandler(async (req, res, next) => {
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


const adminGetAllOrders = asyncHandler(async (req, res, next) => {
    const orders = await Order.find({}).populate("user", "id name")
    if (orders) {
        res.json(orders)
    } else {
        res.status(404);
        throw new Error("not found orders")
    }
})


const changeDeliver = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        order.deliver = true;
        order.deliverat = Date.now();
        const updateOrder = await order.save();
        res.json(updateOrder);
    } else {
        res.status(404);
        throw new Error("not found order")
    }
})


module.exports = {
    createOrder, getOrderById, updateOrderToPay, getUserOrders, adminGetAllOrders, changeDeliver
}