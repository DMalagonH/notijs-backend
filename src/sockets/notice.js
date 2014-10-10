module.exports = function(io){
	
	var NSocket = io.of("/Notijs");

    NSocket.on('connection', function(socket){	
	    var socket_id = socket.id;

		var addConnection = function(data){                
	    	var user_id = data.user_id;
			var room = user_id;
			socket.join(room);
	    };
	    
	    socket.on("connection", addConnection);

	    socket.on("disconnect", function(){
	    	// nothing
	    });
	});

	return NSocket;
};