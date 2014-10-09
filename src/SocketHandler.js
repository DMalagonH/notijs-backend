var _ = require("lodash");
var connections = [];

module.exports = function(params){

	var io = params.io;

	function findUserConnectionById (user_id) {
    	return _.find(connections, {"user_id": user_id});
    }

    function findUserConnectionBySocket(socket_id){
		return _.find(connections, {"sockets": [socket_id]});
    }

	return {
		handler: function(socket){
		                
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

		    			// Eliminar socket del arreglo de sockets del usuario
		    			_.remove(user_conn.sockets, function(s){
		    				return s === socket_id;
		    			});
		    		}
		    		// Si hay solo una conexión
		    		else if(user_conn.sockets.length === 1){
		    			// Eliminar usuario del arreglo de conexiones
		    			_.remove(connections, user_conn);
		    		}
		    	}	                	
		    };

		    socket.on("connection", addConnection);

		    socket.on("disconnect", removeConnection);
		},
		connections: connections,
		findUserConnectionById: findUserConnectionById,
		findUserConnectionBySocket: findUserConnectionBySocket
	};
}