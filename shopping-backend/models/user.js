const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');


const userschema = mongoose.Schema({
    name: {
        required: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
    },
    email: {
        required: true,
        type: String,
    },
    isAdmin: {
        required: true,
        default: false,
        type: Boolean
    }
}, {
    timestamps: true
})



userschema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})
const User = mongoose.model("User", userschema);
module.exports = User;
