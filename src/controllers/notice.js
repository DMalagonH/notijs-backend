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
app.get('/notices/:user_id/:num_items?', function(req, res){  

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
app.post("/notice/read", function(req, res){
	var data = req.body;

	//console.log(data);

	res.status(200).send();
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