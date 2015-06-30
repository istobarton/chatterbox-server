/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var messages = []

var fs = require('../client/bower_components')

// fs.mkdir("/lib", 0777, function(err)){
//     if(err){
//     console.log(err);
//   } else {
//     console.log('Directory created');
//   }
// }

var requestHandler = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);

  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;
    console.log('url: ' + request.url)
    headers['Content-Type'] = "application/json";

  if (request.method === 'GET'){
    if (request.url === '/classes/messages' || request.url ==='/classes/room1'){
      response.writeHead(200, headers);
      response.end(JSON.stringify({results: messages}));
    } else {
      headers['Content-Type'] = "text/html";
      response.writeHead(404, headers);
      //response.write('<!doctype html><html><head><title>404</title></head><body>404: Resource Not Found</body></html>');
      response.write('<>');
      response.end();
    }

  }else if (request.method === 'POST'){
    if (request.url === '/classes/messages' || request.url === '/classes/room1'){
      var data = '';
      response.writeHead(201, headers);
      request.on('data', function(chunk){
        data += chunk;
      });
      request.on('end', function(){
        messages.push(JSON.parse(data))
        response.end(data);
      });
    } else {
      response.writeHead(404, headers);
      response.end('not found');
    }
  } else if (request.method === 'OPTIONS'){
      response.writeHead(200, headers);
      response.end(JSON.stringify(headers));
  }

};

var defaultCorsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Cccess-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "X-Parse-Application-Id, X-Parse-REST-API-Key, content-type, accept",
  "Access-Control-Max-age": 10 // Seconds.
};

exports.requestHandler = requestHandler;
