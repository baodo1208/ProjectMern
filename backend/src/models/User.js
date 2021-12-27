const mongoose = require( 'mongoose' );
const { Schema } = mongoose;

const UserSchema = new Schema( {
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
} )

module.exports = mongoose.model( "User", UserSchema );