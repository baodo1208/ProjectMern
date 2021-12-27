const express = require( 'express' );
require( 'dotenv' ).config();
const AuthRoute = require( "./src/routers/auth" );
const userRoute = require( "./src/routers/user" );
const productRoute = require( "./src/routers/product" );
const cartRoute = require( "./src/routers/cart" );
const cors = require( 'cors' );
const cookieSession = require( "cookie-session" );
const passport = require( "passport" );
const DBConnect = require( "./src/config/DBConnect" );


const app = express();

DBConnect();


app.use( cors( {
    origin: true,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
} ) );
// Config urlencoded
app.use( express.urlencoded( { extended: false } ) );
app.use( express.json() );

app.set( 'trust proxy', 1 )

app.use(
    cookieSession( {
        name: "tokenGoogle",
        keys: [ process.env.KEY_SESSION_COOKIE ],
        maxAge: 10 * 60 * 100,
        secure: true,
        sameSite: "none"
    } )
);

app.use( passport.session() );

app.use( "/auth", AuthRoute );
app.use( "/users", userRoute );
app.use( "/products", productRoute );
app.use( "/carts", cartRoute );


const port = process.env.PORT || 5000;
app.listen( port, () => {
    console.log( `server started in port: localhost:${ port }` )
} )