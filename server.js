/**
* Module dependencies
*/
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var params = require("./config/params");
var socketio = require("socket.io");
var cors = require('cors');

var app = module.exports = express();

// Middleware
app.use(bodyParser.json('application/json'));
app.use(cors());


if (!module.parent) {
	// Conectar con MongoDB
	mongoose.connect("mongodb://"+ params.mongodb_host +":"+ params.mongodb_port +"/"+ params.mongodb_dbname , function(err, res) {

		if(err) {
			console.log('ERROR: connecting to Database. ' + err);
		} 
		else {
			// Iniciar servidor
			var server = app.listen(params.http_port, function(){
				console.log("Notijs listening in port", params.http_port);
			});

            // Iniciar socket
            var io = socketio.listen(server);
            var NSocket = require("./src/sockets/notice")(io);

            // Controllers
			var NoticeController = require("./src/controllers/notice")({ NSocket: NSocket });
			app.use(NoticeController);

		}
	});
}
else{
	// Controllers
	var NoticeController = require("./src/controllers/notice")({});
	app.use(NoticeController);
}