// Module dependencies
var express = require('express');


var app = express();
var params = require("./params");

app.get('/', function(req, res){   
   res.send('hello world'); 
});


app.listen(params.http_port);