var express = require('express');

var app = express();
var path = require('path');
var CLIENT_PATH = '/client_src';

app.use( '/', express.static( path.join( __dirname, CLIENT_PATH ) ) );

var server = app.listen( 3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log( 'listening %s:%s', host, port );
} );
