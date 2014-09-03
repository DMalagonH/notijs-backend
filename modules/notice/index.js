/**
* Module dependencies
*/
var express = require('express');
var app = express();

app.get('/', function(req, res){   
   res.send('NOTIJS'); 
});

module.exports = app;