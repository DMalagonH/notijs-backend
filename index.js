/**
* Module dependencies
*/
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var params = require("./config/params");

var app = module.exports = express();


// parse json requests
app.use(bodyParser.json('application/json'));

/**
* Routes
*/
var notice = require("./src/controllers/notice");
app.use(notice);


if (!module.parent) {
	// Conectar con MongoDB
	mongoose.connect("mongodb://"+ params.mongodb_host +"/"+ params.mongodb_dbname +":"+ params.mongodb_port , function() {

		// Iniciar servidor
		app.listen(params.http_port, function(){
			console.log("Notijs listening in port", params.http_port);
		});
	});
}