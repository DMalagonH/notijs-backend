/**
* Module dependencies
*/
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var params = require("./config/params");
var socketio = require("socket.io");

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
	mongoose.connect("mongodb://"+ params.mongodb_host +":"+ params.mongodb_port +"/"+ params.mongodb_dbname , function(err, res) {

		if(err) {
			console.log('ERROR: connecting to Database. ' + err);
		} 
		else {
			// Iniciar servidor
			var server = app.listen(params.http_port, function(){
				console.log("Notijs listening in port", params.http_port);
			});
            
            var io = socketio.listen(server);
            
            io.sockets.on('connection', function(socket){
                socket.emit('connected'); 
                //Evento creado por nosotros se puede llamar 'pepito'
            });
		}
	});
}