const CryptoJS = require( "crypto-js" );

function encodePassword( passwordEncode ) {
    return CryptoJS.AES.encrypt( passwordEncode, process.env.CRYPTO_SEC ).toString()
}

function decodePassword( passwordDecode ) {
    return CryptoJS.AES.decrypt( passwordDecode, process.env.CRYPTO_SEC ).toString( CryptoJS.enc.Utf8 );
}

module.exports = {
    encodePassword, decodePassword
}