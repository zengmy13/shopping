const mongoose = require('mongoose');
const Product = require("./models/product");
const products = require('./data/products');
const connectdb = require('./db/index');
const User = require("./models/user")
const users = require("./data/user")


connectdb();

const importdata = async () => {

    try {
        await Product.deleteMany();
        await User.deleteMany();
        await Product.insertMany(products);
        await User.insertMany(users)
        console.log("imported");
    } catch (error) {
        console.log(error)
    }
}


importdata()