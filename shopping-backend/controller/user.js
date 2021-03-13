const User = require("../models/user")
var generatetoken = require("../utils/index");
var bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler')
const login = asyncHandler(async (req, res, next) => {
    const {email, password} = req.body;
    const user = await User.findOne({
        email
    })
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin,
            token: generatetoken(user._id)
        })
    } else {
        res.status(401);
        throw new Error("Something wrong with email or password")
    }
})

const register = asyncHandler(async (req, res, next) => {
    const {email, password, name} = req.body;
    const existuser = await User.findOne({email})
    if (existuser) {
        res.status(400);
        throw new Error("Already exist")
    }
    const newuser = await User.create({
        email, password, name
    })
    if (newuser) {
        res.json({
            id: newuser._id,
            name: newuser.name,
            email: newuser.email,
            isAdmin: newuser.isAdmin,
            token: generatetoken(newuser._id)
        })
    } else {
        res.status(400);
        throw new Error("invalid user data")
    }
})

const getprofile = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user._id)
    if (user) {
        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404);
        throw new Error("not found user")
    }
})

const updateprofile = asyncHandler(async (req, res, next) => {
    const {name, email, password} = req.body;
    const user = await User.findById(req.user._id);
    if (user) {
        user.name = name || user.name;
        user.email = email || user.email;
        user.password = password || user.password;
        const updateduser = await user.save();
        res.json({
            id: updateduser._id,
            name: updateduser.name,
            email: updateduser.email,
            isAdmin: updateduser.isAdmin,
            token: generatetoken(updateduser._id)
        })
    } else {
        res.status(404);
        throw new Error("not found user")
    }
})
const admingetallusers = asyncHandler(async (req, res, next) => {
    const allusers = await User.find({});
    if (allusers) {
        res.json(allusers)
    } else {
        res.status(404);
        throw new Error("not found users")
    }
})

const deleteuser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (user) {
        await user.remove();
        res.json({
            message: "success delete"
        })
    } else {
        res.status(404);
        throw new Error("not found user")
    }
})


const adminfinduser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id).select("-password");
    if (user) {
        res.json(user)
    } else {
        res.status(404);
        throw new Error("not found user")
    }
})


const updateadminuser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin;
        const updateduser = await user.save();
        res.json({
            id: updateduser._id,
            name: updateduser.name,
            email: updateduser.email,
            isAdmin: updateduser.isAdmin
        })
    } else {
        res.status(404);
        throw new Error("not found user")
    }
})


module.exports = {
    login, register, getprofile, updateprofile, admingetallusers, updateadminuser, adminfinduser, deleteuser
}