/* Import node's http module: */
/*var http = require("http");
var handleRequest = require('./request-handler').requestHandler;

var port = 3000;

var ip = "127.0.0.1";

var server = http.createServer(handleRequest);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);*/
var express = require('express');
var app = express();
var messages = [];
var defaultCorsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Cccess-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "X-Parse-Application-Id, X-Parse-REST-API-Key, content-type, accept",
  "Access-Control-Max-age": 10 // Seconds.
};

var headers = defaultCorsHeaders;

app.get('/classes/messages', function(req, res){
  headers['Content-Type'] = 'application/json'
  res.writeHead(200, headers);
  res.end(JSON.stringify({results: messages}));

});

app.get('/classes/room1', function(req, res){
  res.writeHead(200, headers);
  res.end(JSON.stringify({results: messages}));

});

app.post('/classes/messages', function(req, res){
  var data = '';
  res.writeHead(201, headers);
  req.on('data', function(chunk){
    data += chunk;
  });
  req.on('end', function(){
    messages.push(JSON.parse(data))
    res.end(data);
  });

});
app.post('/classes/room1', function(req, res){
  var data = '';
  res.writeHead(201, headers);
  req.on('data', function(chunk){
    data += chunk;
  });
  req.on('end', function(){
    messages.push(JSON.parse(data))
    res.end(data);
  });
});

app.options('/classes/messages', function(req, res){
  res.writeHead(200, headers);
  res.end(JSON.stringify(headers));

});

app.options('/classes/room1', function(req, res){
  res.writeHead(200, headers);
  res.end(JSON.stringify(headers));

});

app.listen(3000, function(){
  console.log('Listening on port 3000...')
});
