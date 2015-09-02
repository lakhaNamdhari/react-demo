/**
*	Static server using connect
*	
*	@author Lakha Singh
*/

var connect = require('connect');

var http = require('http');

var connectStatic = require('serve-static');

var server = connect();

server.use( connectStatic('./', {index: 'index.html'}) );

http.createServer( server ).listen( process.env.PORT || 5000 );