const mongoose = require( 'mongoose' );
const { Schema } = mongoose;

const ProductSchema = new Schema( {
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    categories: {
        type: [ String ]
    },
    size: [ String ],
    price: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true,
} )

module.exports = mongoose.model( "Product", ProductSchema );