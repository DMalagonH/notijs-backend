/**
* Module dependencies
*/
var express = require('express');


var app = module.exports = express();
var bodyParser = require('body-parser');
var params = require("./config/params");

// parse json requests
app.use(bodyParser.json('application/json'));

/**
* Routes
*/
var notice = require("./modules/notice");
app.use(notice);


if (!module.parent) {
	app.listen(params.http_port, function(){
		console.log("Notijs listening in port", params.http_port);
	});
}