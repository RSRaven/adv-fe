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

// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname + '/client_src/post.html' ));
// });

// app.use(express.static(__dirname + '/client_src' ));

// // start the server
// app.listen(3000);
// console.log('3000 is the magic port!');