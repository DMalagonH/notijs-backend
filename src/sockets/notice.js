module.exports = function(io){
	
	var NSocket = io.of("/Notijs");

    NSocket.on('connection', function(socket){	
	    var socket_id = socket.id;

		var addConnection = function(data){
        	console.log("Conectado a /Notijs");	                
	    	var user_id = data.user_id;
			var room = user_id;
			socket.join(room);

	    	socket.emit("serverSays", "Conectado!"); // Enviar mensaje al socket del usuario
	    	//socket.broadcast.emit("serverSays", "Un nuevo conectado!"); // Enviar mensaje a los demás usuarios
	    	//NSocket.emit("serverSays", "Estan conectados!"); // Enviar mensaje a todos los usuarios
	    	//NSocket.to(room).emit("serverSays", "Mensaje al room de usuario"); // Enviar mensaje a room de usuario
	    };
	    socket.on("connection", addConnection);

	    socket.on("disconnect", function(){
	    	// nothing
	    });
	});

	return NSocket;
};