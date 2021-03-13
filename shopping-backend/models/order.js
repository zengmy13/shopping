const mongoose = require('mongoose');


const orderschema = mongoose.Schema({
    user: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    orderitems: [{
        productid: {ref: "Product", required: true, type: mongoose.Schema.Types.ObjectId},
        name: {type: String, required: true},
        image: {type: String, required: true},
        price: {type: Number, required: true},
        qty: {type: Number, required: true}
    }],
    shippingaddress: {
        country: {
            type: String,
            required: true
        },
        postcode: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        }
    },
    paymentmethod: {
        required: true,
        type: String
    },
    paymentresult: {
        id: {type: String},
        status: {type: String},
        update_time: {type: String},
        email_address: {type: String}
    },
    paidat: {
        type: Date
    },
    ispaid: {
        type: Boolean,
        default: false,
        required: true
    },
    deliver: {
        type: Boolean,
        required: true,
        default: false,
    },
    deliverat: {
        type: Date
    },
    itemsprice: {
        required: true,
        type: Number
    },
    shippingprice: {
        required: true,
        type: Number,
        default: 0.00
    },
    taxprice: {
        required: true,
        type: Number,
        default: 0.00
    },
    totalprice: {
        required: true,
        type: Number,
        default: 0.00
    }
}, {
    timestamps: true
})


const Order = mongoose.model("orders", orderschema);
module.exports = Order