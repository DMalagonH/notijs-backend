/**
* Module dependencies
*/
var express = require('express');


var app = module.exports = express();
var params = require("./config/params");

app.get('/', function(req, res){   
   res.send('NOTIJS'); 
});


if (!module.parent) {
	app.listen(params.http_port, function(){
		console.log("Notijs listening in port", params.http_port);
	});
}