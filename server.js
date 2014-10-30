/**
* Module dependencies
*/
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var config = require("./config/config");
var socketio = require("socket.io");
var cors = require('cors');

var app = module.exports = express();

// Middleware
app.use(bodyParser.json('application/json'));
app.use(cors());


if (!module.parent) {
	// Conectar con MongoDB
	mongoose.connect("mongodb://"+ config.mongodb_user +":"+ config.mongodb_password +"@"+ config.mongodb_host +":"+ config.mongodb_port +"/"+ config.mongodb_dbname , function(err, res) {

		if(err) {
			console.log('ERROR: connecting to Database. ' + err);
		} 
		else {
			// Iniciar servidor
			var server = app.listen(config.http_port, function(){
				console.log("Notijs listening in port", config.http_port);
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