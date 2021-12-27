const express = require( 'express' );
const Product = require( "../models/Product" );
const { verifyTokenAdmin } = require( "../utils/handleToken" );

const router = express.Router();

// GET PRODUCT
router.get( "/find/:id", async ( req, res ) => {
    try {
        const product = await Product.findById( req.params.id );
        res.status( 200 ).json( product );
    } catch ( e ) {
        res.status( 500 ).json( "server error" );
    }
} )

// GET ALL PRODUCT
router.get( "/", async ( req, res ) => {
    const newest = req.query.new;
    const category = req.query.category;
    let products;
    try {
        if ( newest ) {
            products = await Product.find().sort( { createdAt: -1 } );
        } else if ( category ) {
            products = await Product.find( {
                categories: { $in: category }
            } )
        } else {
            products = await Product.find();
        }
        res.status( 200 ).json( products );
    } catch ( e ) {
        res.status( 500 ).json( "server error" );
    }
} )

// ADD PRODUCT
router.post( "/", verifyTokenAdmin, async ( req, res ) => {
    try {
        const newProduct = await Product.create( req.body );
        res.status( 201 ).json( newProduct );
    } catch ( e ) {
        res.status( 500 ).json( "server error" );
        console.log( e )
    }
} )

// UPDATE PRODUCT
router.put( "/:id", verifyTokenAdmin, async ( req, res ) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate( req.params.id, req.body, {
            new: true,
        } );
        res.status( 201 ).json( updatedProduct );
    } catch ( e ) {
        res.status( 500 ).json( "server error" );
    }
} )

// DELETE PRODUCT
router.delete( "/:id", verifyTokenAdmin, async ( req, res ) => {
    try {
        await Product.findByIdAndDelete( req.params.id );
        res.status( 201 ).json( "product have been deleted..." );
    } catch ( e ) {
        res.status( 500 ).json( "server error" );
    }
} )

module.exports = router;