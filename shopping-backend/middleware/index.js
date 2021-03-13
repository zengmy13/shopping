const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const checkuserlogin = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
        const decode = await jwt.verify(token, "ABC123");
        if (decode) {
            req.user = await User.findById(decode.id);
            next()
        } else {
            res.status(401);
            throw new Error("no authorization")
        }
    } else {
        res.status(401);
        throw new Error("no authorization")
    }
})

const isadmin = asyncHandler(async (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error("not authorization only admin accepted")
    }
})

module.exports = {
    checkuserlogin, isadmin
}