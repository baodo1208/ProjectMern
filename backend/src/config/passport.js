const passport = require( 'passport' );
const GoogleStrategy = require( "passport-google-oauth20" ).Strategy;
const { encodePassword } = require( "../utils/handlePassword" );
const User = require( "../models/User" );
const jwt = require( 'jsonwebtoken' );


passport.use( new GoogleStrategy( {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
}, function ( accessToken, refreshToken, profile, cb ) {
    const passWordEncode = encodePassword( "1" );
    const createUser = async () => {
        try {
            let token = "";
            const user = await User.findOne( {
                username: profile.emails[ 0 ].value
            } )
            if ( user ) {
                token = jwt.sign( {
                    userId: user._id,
                    isAdmin: user.isAdmin
                }, process.env.JWT_SEC, {
                    expiresIn: "1d"
                } )
                const { password, ...others } = user._doc;
                cb( null, { ...others, token } );
            } else {
                const newUser = await User.create( {
                    firstname: profile.name.givenName,
                    lastname: profile.name.familyName,
                    username: profile.emails[ 0 ].value,
                    email: profile.emails[ 0 ].value,
                    password: passWordEncode,
                    isAdmin: false
                } );
                token = jwt.sign( {
                    userId: newUser._id,
                    isAdmin: newUser.isAdmin
                }, process.env.JWT_SEC, {
                    expiresIn: "1d"
                } )
                const { password, ...others } = newUser._doc;
                cb( null, { ...others, token } );
            }
        } catch ( e ) {
            cb( null, null );
        }
    }
    createUser();
}
) )

passport.serializeUser( ( user, done ) => {
    done( null, user );
} );

passport.deserializeUser( ( user, done ) => {
    done( null, user );
} );

module.exports = passport;