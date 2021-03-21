const Product = require("./models/product");
const products = require('./data/products');
const connectDB = require('./db/index');
const User = require("./models/user")
const users = require("./data/user")


connectDB();

const importData = async () => {

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

importData()