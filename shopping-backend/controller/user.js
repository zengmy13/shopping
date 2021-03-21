const User = require("../models/user")
const generateToken = require("../utils/index");
const bcrypt = require('bcryptjs');
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
            token: generateToken(user._id)
        })
    } else {
        res.status(401);
        throw new Error("Something wrong with email or password")
    }
})

const register = asyncHandler(async (req, res, next) => {
    const {email, password, name} = req.body;
    const existUser = await User.findOne({email})
    if (existUser) {
        res.status(400);
        throw new Error("Already exist")
    }
    const newUser = await User.create({
        email, password, name
    })
    if (newUser) {
        res.json({
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: generateToken(newUser._id)
        })
    } else {
        res.status(400);
        throw new Error("invalid user data")
    }
})

const getProfile = asyncHandler(async (req, res, next) => {
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

const updateProfile = asyncHandler(async (req, res, next) => {
    const {name, email, password} = req.body;
    const user = await User.findById(req.user._id);
    if (user) {
        user.name = name || user.name;
        user.email = email || user.email;
        user.password = password || user.password;
        const updatedUser = await user.save();
        res.json({
            id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })
    } else {
        res.status(404);
        throw new Error("not found user")
    }
})

const adminGetAllUsers = asyncHandler(async (req, res, next) => {
    const allUsers = await User.find({});
    if (allUsers) {
        res.json(allUsers)
    } else {
        res.status(404);
        throw new Error("not found users")
    }
})

const deleteUser = asyncHandler(async (req, res, next) => {
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

const adminFindUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id).select("-password");
    if (user) {
        res.json(user)
    } else {
        res.status(404);
        throw new Error("not found user")
    }
})

const updateAdminUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin;
        const updatedUser = await user.save();
        res.json({
            id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })
    } else {
        res.status(404);
        throw new Error("not found user")
    }
})

module.exports = {
    login, register, getProfile, updateProfile, adminGetAllUsers, updateAdminUser, adminFindUser, deleteUser
}