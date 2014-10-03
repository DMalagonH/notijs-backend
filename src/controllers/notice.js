/**
 * Module dependencies
 */
var express = require('express');
var _ = require("lodash");

var app = express();

// Modelo
var Notice = require("../models/notice");


/**
 * Función para enlistar notificaciones
 */
app.get('/notice/list/:user_id/:num_items?', function(req, res){  

    var user_id = parseInt(req.params.user_id);
    var num_items = parseInt(req.params.num_items) || null;
    
    // Obtener notificaciones del usuario ordenadas por fecha descendentemente y con el límite indicado
    Notice.find({
    	"user_id": user_id
    })
    .sort({
		datetime: -1
	})
	.limit(num_items)
	.exec(function(err, notices){
    	// Response
    	res
			.status(200)
			.set('Content-Type','application/json')
			.json({
				notices: notices
			});
    });
});

/**
 * Función para obtener número de notificaciones sin leer
 */
app.get("/notice/unread/:user_id", function(req, res){
	
	var user_id = parseInt(req.params.user_id);

	Notice.count({
		"user_id": 	user_id, 
		"read": 	false
	})
	.exec(function(err, count){
		res
			.status(200)
			.set('Content-Type','application/json')
			.json({
				"unread": count
			});	
	});
});

/**
 * Función para crear una notificacion
 */
app.post("/notice", function(req, res){
	// Obtener datos del request
	var data = req.body;
	var new_notice = data.notice;

	// Registrar notificación en MongoDB
	Notice.create(new_notice).then(function(notice){
		// Response
		res.status(201)
			.json({
				notice: notice.toJSON()
			});
	});
});

/**
 * Función para marcar notificaciones como leídas
 */
app.patch("/notice/read", function(req, res){
	// Obtener datos del request
	var data = req.body;
	var marks = data.mark_as_read;
	var user_id = marks.user_id;

	// Preparar datos de consulta
	var find = {
		"user_id": 	user_id,
		"read": 	false
	};
	if(typeof(marks._id) !== "undefined"){
		find._id = marks._id;
	}

	Notice.update(find, 
		{
			$set:{
				"read": true
			}	
		},
		{
			"multi": true
		}
	)
	.exec(function(err, num_afected){
		res.status(200)
			.json({
				afected: num_afected
			});
	});

});

/**
 * Función para eliminar notificaciones
 */
app.delete("/notice", function(req, res){
	var data = req.body;

	//console.log(data);

	res.status(204).send();
});

/**
 * Función para enviar notificaciones instantáneas
 */
app.post("/notice/flash", function(req, res){
	var data = req.body;

	//console.log(data);

	res.status(200).send();
});


module.exports = app;