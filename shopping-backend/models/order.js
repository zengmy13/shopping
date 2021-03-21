const mongoose = require('mongoose');


const orderSchema = mongoose.Schema({
    user: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    orderItems: [{
        productId: {ref: "Product", required: true, type: mongoose.Schema.Types.ObjectId},
        name: {type: String, required: true},
        image: {type: String, required: true},
        price: {type: Number, required: true},
        qty: {type: Number, required: true}
    }],
    shippingAddress: {
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
    paymentMethod: {
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
    itemsPrice: {
        required: true,
        type: Number
    },
    shippingPrice: {
        required: true,
        type: Number,
        default: 0.00
    },
    taxPrice: {
        required: true,
        type: Number,
        default: 0.00
    },
    totalPrice: {
        required: true,
        type: Number,
        default: 0.00
    }
}, {
    timestamps: true
})


const Order = mongoose.model("orders", orderSchema);
module.exports = Order