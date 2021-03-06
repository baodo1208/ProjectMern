const mongoose = require( 'mongoose' );

const CartSchema = new mongoose.Schema( {
    userId: {
        type: String,
        required: true,
    },
    products: [ {
        productId: { type: String, required: true },
        img: { type: String, required: true },
        size: { type: String, required: true },
        title: { type: String, required: true },
        desc: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, default: 1 }
    } ]
}, { timestamps: true } )

module.exports = mongoose.model( "Cart", CartSchema );