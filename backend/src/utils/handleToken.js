const jwt = require( 'jsonwebtoken' );

function verifyToken( req, res, next ) {
    const originalToken = req.headers.token;
    if ( !originalToken ) {
        res.status( 403 ).json( "action must have token in headers" )
    }
    try {
        const token = originalToken.split( " " )[ 1 ];
        const userInfo = jwt.verify( token, process.env.JWT_SEC );
        req.userInfo = userInfo;
        next();
    } catch ( e ) {
        res.status( 403 ).json( "token invalid" )
    }
}

function verifyAndAuthorization( req, res, next ) {
    verifyToken( req, res, () => {
        if ( req.params.userId === req.userInfo.userId || req.userInfo.isAdmin ) {
            next();
        } else {
            res.status( 403 ).json( "not permission" );
        }
    } )
}

function verifyTokenAdmin( req, res, next ) {
    verifyToken( req, res, () => {
        if ( req.userInfo.isAdmin ) {
            next();
        } else {
            res.status( 403 ).json( "not permission" );
        }
    } )
}

module.exports = {
    verifyToken,
    verifyAndAuthorization, verifyTokenAdmin
}