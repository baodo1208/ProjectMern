const mongoose = require( 'mongoose' );

function DBConnect() {
    mongoose.connect( process.env.URL_DB, { useNewUrlParser: true, useUnifiedTopology: true } ).then( () => {
        console.log( "DB connect success" );
    } ).catch( ( e ) => {
        console.log( e );
    } );
}

module.exports = DBConnect;