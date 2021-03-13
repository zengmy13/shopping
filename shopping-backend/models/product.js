const mongoose = require('mongoose');

const reviewschema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

const productschema = mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    image: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    brand: {
        required: true,
        type: String
    },
    category: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: Number,
        default: 0
    },
    countInStock: {
        required: true,
        type: Number,
        default: 0
    },
    rating: {
        required: true,
        type: Number,
        default: 0
    },
    numreviews: {
        type: Number,
        required: true,
        default: 0
    },
    reviews: [reviewschema]
}, {
    timestamps: true
})


const Product = mongoose.model("products", productschema);
module.exports = Product;