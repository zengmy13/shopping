const Product = require("../models/product");
const asyncHandler = require('express-async-handler')

const getproducts = asyncHandler(async (req, res, next) => {
    const page = Number(req.query.page) || 1;
    const limit = 2
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: "i"
        }
    } : {}
    try {
        const count = await Product.countDocuments(keyword)
        const products = await Product.find(keyword).skip(limit * (page - 1)).limit(2);
        const totalpage = Math.ceil(count / limit)
        res.json({products, totalpage, page})
    } catch (error) {
        res.status(404);
        res.json({
            message: "not found products"
        })
    }
})

const getproduct = asyncHandler(async (req, res, next) => {
    const {id} = req.params;
    try {
        const product = await Product.findById(id);
        res.json(product)
    } catch (error) {
        res.status(404);
        res.json({
            message: "not found product"
        })
    }
})

const admindeleteproduct = asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        await product.remove();
        res.json({
            message: "success delete"
        })
    } else {
        res.status(404);
        throw new Error("not found product")
    }
})

const adminupdateproduct = asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        product.name = req.body.name || product.name;
        product.price = req.body.price || product.price;
        product.image = req.body.image || product.image;
        product.brand = req.body.brand || product.brand;
        product.countInStock = req.body.countInStock || product.countInStock;
        product.category = req.body.category || product.category;
        product.description = req.body.description || product.description;
        const updateproduct = await product.save();
        res.json(updateproduct);
    } else {
        res.status(404);
        throw new Error("not found product")
    }
})


const admincreateproduct = asyncHandler(async (req, res, next) => {
    const {name, price, image, brand, category, countInStock, description} = req.body;
    const product = await new Product({
        name, price, image, brand, category, countInStock, description,
    })
    const createproduct = await product.save();
    if (createproduct) {
        res.json(createproduct)
    } else {
        res.status(404);
        throw new Error("not found product")
    }
})

const choosetopproducts = asyncHandler(async (req, res, next) => {
    const products = await Product.find({}).sort({rating: -1}).limit(3)
    res.json(products);
})


const addreviewtoproduct = asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    const {rating, comment} = req.body;

    const alreadyaddreviews = product.reviews.find(x => x.user.toString() === req.user._id.toString())
    if (alreadyaddreviews) {
        res.status(404);
        throw new Error("PRODUCT ALREADY REVIEW");
        return;
    }
    if (product) {
        product.reviews.push({
            rating: Number(rating),
            comment: comment,
            name: req.user.name,
            user: req.user._id
        })
        product.numreviews = product.reviews.length;
        product.rating = product.reviews.reduce((acc, item) => acc + item.rating, 0) / product.reviews.length;

        res.json({
            message: "review added"
        })
    } else {
        res.status(404);
        throw new Error("not found product")
    }


})


module.exports = {
    getproducts, getproduct, admindeleteproduct,
    adminupdateproduct, admincreateproduct, choosetopproducts, addreviewtoproduct
}