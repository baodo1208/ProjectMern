const express = require( 'express' );
const User = require( "../models/User" );
const jwt = require( 'jsonwebtoken' );
const { decodePassword, encodePassword } = require( "../utils/handlePassword" );
const router = express.Router();
const passport = require( "../config/passport" );

const CLIENT_URL = "https://brave-jackson-511af3.netlify.app/";

// register
router.post( "/register", async ( req, res ) => {
    const passWordEncode = encodePassword( req.body.password );
    try {
        const newUser = await User.create( {
            ...req.body,
            password: passWordEncode
        } );
        const token = jwt.sign( {
            userId: newUser._id,
            isAdmin: newUser.isAdmin
        }, process.env.JWT_SEC, {
            expiresIn: "1d"
        } )

        const { password, ...others } = newUser._doc;
        res.status( 200 ).json( { ...others, token } );
    } catch ( e ) {
        console.log( e );
        res.status( 500 ).json( "server error" );
    }
} )

// login by google
router.get( "/google", passport.authenticate( "google", { scope: [ "profile", "email" ] } ) );

// login by google success
router.get( "/success", ( req, res ) => {
    if ( req.user ) {
        res.status( 200 ).json( {
            user: req.user,
        } );
    } else {
        res.status( 404 ).json( "cookie in valid" );
    }
} );
// hanlde login by google
router.get(
    "/google/callback",
    passport.authenticate( "google", {
        successRedirect: CLIENT_URL,
        failureRedirect: "/auth/google",
    } )
);

// login
router.post( "/login", async ( req, res ) => {
    try {
        const user = await User.findOne( {
            username: req.body.username
        } )

        if ( !user ) {
            res.status( 403 ).json( "Username invalid" );
        }

        const passwordDecode = decodePassword( user.password );
        if ( req.body.password === passwordDecode ) {
            const token = jwt.sign( {
                userId: user._id,
                isAdmin: user.isAdmin
            }, process.env.JWT_SEC, {
                expiresIn: "1d"
            } )

            const { password, ...others } = user._doc;
            res.status( 200 ).json( { ...others, token } );
        } else {
            res.status( 403 ).json( "password incorrect" );
        }
    } catch ( e ) {
        console.log( e )
    }
} )

module.exports = router;