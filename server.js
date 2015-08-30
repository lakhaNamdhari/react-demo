/**
*	Static server using connect
*	
*	@author Lakha Singh
*/

var connect = require('connect');

var http = require('http');

var connectStatic = require('serve-static');

var server = connect();

server.use( connectStatic('public', {index: 'index.html'}) );

http.createServer( server ).listen( 5999 );