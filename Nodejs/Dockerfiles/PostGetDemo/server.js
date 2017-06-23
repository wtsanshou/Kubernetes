var http = require('http') // http module
  , fs = require('fs')  // file system module
  , qs = require('qs'); // querystring parser

// store the contents of 'index.html' to a buffer
var html = fs.readFileSync('./index.html');

// create the http server
http.createServer(function (req, res) {

  // handle the routes
  if (req.method == 'POST') {

    // pipe the request data to the console
    req.pipe(process.stdout);

    // pipe the request data to the response to view on the web
    res.writeHead(200, {'Content-Type': 'text/plain'});
    req.pipe(res);

  } else {
    
    // for GET requests, serve up the contents in 'index.html'
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
  }

}).listen(80);
