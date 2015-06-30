/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var messages = []
var requestHandler = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);

  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;
    headers['Content-Type'] = "application/json";
    console.log('url: ' + request.url)

  if (request.method === 'GET'){

    if (request.url !== '/classes/messages'){
      response.writeHead(404, headers);
      response.end();

    } else {
      response.writeHead(200, headers);
      response.end(JSON.stringify({results: messages}));
    }

  }else if (request.method === 'POST'){
    headers['Content-Type'] = "text/plain";
    if (request.url === '/classes/messages'){
      var message = '';
      response.writeHead(201, headers);
      request.on('data', function(chunk){
        message += chunk;
      });
      request.on('end', function(){
        //console.log(message);
        response.end(message);
      })
    } else {
      response.writeHead(404, headers);
      response.end('not found');
    }
  }

};

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

exports.requestHandler = requestHandler;
