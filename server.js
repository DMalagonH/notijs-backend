/**
* Module dependencies
*/
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var params = require("./config/params");
var socketio = require("socket.io");
var _ = require("lodash");

var app = module.exports = express();
var connections = [];

app.use(express["static"](__dirname + '/public'));
// parse json requests
app.use(bodyParser.json('application/json'));

/**
* Routes
*/
var notice = require("./src/controllers/notice");
app.use(notice);

app.get('/conn', function(req, res){
	res.json(connections);
});


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

            ns.on('connection', function(socket){
                
            	var addConnection = function(data){
	            	var user_id = data.user_id;
	            	var socket_id = socket.id;
	        		var user_conn = findUserConnectionById(user_id);
	        		
	            	if(!user_conn){
						user_conn = {
							"user_id": 	user_id,
							"sockets": 	[socket_id]  
						} 
						connections.push(user_conn);    		
	            	}
	            	else{
	            		user_conn.sockets.push(socket_id);
	            	}

	            	socket.emit("serverSays", "Conectado!");
	            };

            	var removeConnection = function(){
            		var socket_id = socket.id;
	            	var user_conn = findUserConnectionBySocket(socket_id);

	            	if(user_conn){
	            		// Si hay mas de una conexión
	            		if(user_conn.sockets.length > 1){
		            		var i = user_conn.sockets.indexOf(socket_id);
		            		// Eliminar id de socket del arreglo de sockets del usuario
		            		if(i > -1){
		            			user_conn.sockets.splice(i, 1);
		            		}
	            		}
	            		// Si hay solo una conexión
	            		else if(user_conn.sockets.length === 1){
            				var i = connections.indexOf(user_conn);
            				// Eliminar item de usuario del arreglo de conexiones
            				if(i > -1){
		            			connections.splice(i, 1);
		            		}
	            		}
	            	}	                	
	            };

	            function findUserConnectionById (user_id) {
	            	return _.find(connections, {"user_id": user_id});
	            }

	            function findUserConnectionBySocket(socket_id){
					return _.find(connections, {"sockets": [socket_id]});
	            }

                socket.on("connection", addConnection);

                socket.on("disconnect", removeConnection);

            });
		}
	});
}