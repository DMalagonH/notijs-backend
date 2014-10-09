/**
* Module dependencies
*/
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var params = require("./config/params");
var socketio = require("socket.io");

var app = module.exports = express();
var connections = [];

app.use(express["static"](__dirname + '/public'));
// parse json requests
app.use(bodyParser.json('application/json'));

/**
* Routes
*/
var NoticeController = require("./src/controllers/notice");
app.use(NoticeController);



app.get('/conn', function(req, res){
	res.json(connections);
});


var sockets = require("./src/SocketHandler")();
var socketHandler = sockets.handler;
connections = sockets.connections;


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
            var ns = io.of("/Notijs");

            ns.on('connection', socketHandler);
		}
	});
}