const express = require( 'express' );
const { verifyToken, verifyTokenAdmin, verifyAndAuthorization } = require( "../utils/handleToken" );
const Cart = require( "../models/Cart" );

const router = express.Router();

// CREATE CART
router.post( "/", verifyToken, async ( req, res ) => {
    try {
        const newCart = await Cart.create( req.body );
        res.status( 201 ).json( newCart );
    } catch ( e ) {
        console.log( e )
    }
} )

// GET CART BY USERID
router.get( "/find/:userId", verifyAndAuthorization, async ( req, res ) => {
    try {
        const userCart = await Cart.findOne( {
            userId: req.params.userId
        } )
        res.status( 200 ).json( userCart );
    } catch ( e ) {
        console.log( e );
    }
} )

// UPDATE CART
router.put( "/:userId", verifyAndAuthorization, async ( req, res ) => {
    try {
        const updatedCart = await Cart.findOneAndUpdate( {
            userId: req.params.userId
        }, { $set: req.body }, { returnDocument: "after" } )
        res.status( 200 ).json( updatedCart );
    } catch ( e ) {
        console.log( e );
    }
} )

// DELETE CART
router.delete( "/:userId", verifyAndAuthorization, async ( req, res ) => {
    try {
        await Cart.findOneAndRemove( {
            userId: req.params.userId
        } )
        res.status( 200 ).json( "cart have been delete..." )
    } catch ( e ) {
        console.log( e )
    }
} )

// GET ALL
router.get( "/", verifyTokenAdmin, async ( req, res ) => {
    try {
        const result = await Cart.find();
        res.status( 200 ).json( result );
    } catch ( e ) {
        console.log( e );
    }
} )

module.exports = router;