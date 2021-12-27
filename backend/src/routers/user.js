const express = require( 'express' );
const User = require( "../models/User" );
const { encodePassword } = require( "../utils/handlePassword" );
const { verifyAndAuthorization, verifyTokenAdmin, verifyToken } = require( "../utils/handleToken" );

const router = express.Router();

// CREATE USER
router.post( "/", verifyTokenAdmin, async ( req, res ) => {
    const passWordEncode = encodePassword( req.body.password );
    try {
        const newUser = await User.create( {
            ...req.body,
            password: passWordEncode
        } );

        const { password, ...others } = newUser._doc;
        res.status( 200 ).json( others );
    } catch ( e ) {
        res.status( 500 ).json( "server error..." );
    }
}
)

// UPDATE USER
router.put( "/:id", verifyAndAuthorization, async ( req, res ) => {
    if ( req.body.password ) {
        req.body.password = encodePassword( req.body.password );
    }
    try {
        const userUpdated = await User.findByIdAndUpdate( req.params.id, req.body, {
            new: true
        } )
        const { password, ...others } = userUpdated._doc;
        res.status( 200 ).json( others );
    } catch ( e ) {
        res.status( 500 ).json( "server error" );
    }
} )

// DELETE USER 
router.delete( "/:id", verifyTokenAdmin, async ( req, res ) => {
    try {
        await User.findByIdAndDelete( req.params.id );
        res.status( 200 ).json( "user have been deleted..." );
    } catch ( e ) {
        res.status( 500 ).json( "server error" );
    }
} )

// GET USER
router.get( "/find/:id", verifyTokenAdmin, async ( req, res ) => {
    try {
        const user = await User.findById( req.params.id );
        const { password, ...others } = user._doc;
        res.status( 200 ).json( others );
    } catch ( e ) {
        res.status( 500 ).json( "server error" );
    }
} )

// GET USER BY TOKEN
router.get( "/loginByToken", verifyToken, async ( req, res ) => {
    try {
        const user = await User.findById( req.userInfo.userId );
        const { password, ...others } = user._doc;
        res.status( 200 ).json( others );
    } catch ( e ) {
        res.status( 500 ).json( "server error" );
    }
} )

// GET ALL USERS 
router.get( "/", verifyTokenAdmin, async ( req, res ) => {
    const query = req.query.new;
    let result;
    try {
        if ( query ) {
            result = await User.find().sort( { _id: -1 } ).limit( 5 );
        } else {
            result = await User.find();
        }
        const listUser = result.map( user => {
            const { password, ...others } = user._doc;
            return others;
        } )
        res.status( 200 ).json( listUser );
    } catch ( e ) {
        res.status( 500 ).json( "server error" );
    }
} )


module.exports = router;