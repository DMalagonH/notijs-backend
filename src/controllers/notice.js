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
    // set number of items to get. default is 10
    var num_items = parseInt(req.params.num_items) || 10;
    
	var notices = [
		{
			"_id":		"1654sdfssk6",
			"title":	"Título",
			"body":		"Contenido de la notificación",
			"datetime":	"2014-09-03 12:51:00",
			"img":		"/imgs/image.jpg",
			"url":		"http://www.google.com",
			"user_id":	user_id,
			"read":		false
		},
		{
			"_id":		"sd545433dw45",
			"title":	"Título segunda notificación",
			"body":		"Contenido de la notificación",
			"datetime":	"2014-09-03 13:01:00",
			"img":		null,
			"url":		"/url/a/aplicacion",
			"user_id":	user_id,
			"read":		true
		},
		{
			"_id":		"5d5a6fa657e4",
			"title":	"Título tercera notificación",
			"body":		"Contenido de la notificación",
			"datetime":	"2014-09-03 13:10:00",
			"img":		"http://url/de/la/imagen",
			"url":		null,
			"user_id":	user_id,
			"read":		true
		},
		{
			"_id":		"5d5a6fa657e4",
			"title":	"Título tercera notificación",
			"body":		"Contenido de la notificación",
			"datetime":	"2014-09-03 13:10:00",
			"img":		"http://url/de/la/imagen",
			"url":		null,
			"user_id":	user_id,
			"read":		true
		},
		{
			"_id":		"5d5a6fa657e4",
			"title":	"Título tercera notificación",
			"body":		"Contenido de la notificación",
			"datetime":	"2014-09-03 13:10:00",
			"img":		"http://url/de/la/imagen",
			"url":		null,
			"user_id":	user_id,
			"read":		true
		},
		{
			"_id":		"5d5a6fa657e4",
			"title":	"Título tercera notificación",
			"body":		"Contenido de la notificación",
			"datetime":	"2014-09-03 13:10:00",
			"img":		"http://url/de/la/imagen",
			"url":		null,
			"user_id":	user_id,
			"read":		true
		},
		{
			"_id":		"5d5a6fa657e4",
			"title":	"Título tercera notificación",
			"body":		"Contenido de la notificación",
			"datetime":	"2014-09-03 13:10:00",
			"img":		"http://url/de/la/imagen",
			"url":		null,
			"user_id":	user_id,
			"read":		true
		},
		{
			"_id":		"5d5a6fa657e4",
			"title":	"Título tercera notificación",
			"body":		"Contenido de la notificación",
			"datetime":	"2014-09-03 13:10:00",
			"img":		"http://url/de/la/imagen",
			"url":		null,
			"user_id":	user_id,
			"read":		true
		},
		{
			"_id":		"5d5a6fa657e4",
			"title":	"Título tercera notificación",
			"body":		"Contenido de la notificación",
			"datetime":	"2014-09-03 13:10:00",
			"img":		"http://url/de/la/imagen",
			"url":		null,
			"user_id":	user_id,
			"read":		true
		},
		{
			"_id":		"5d5a6fa657e4",
			"title":	"Título tercera notificación",
			"body":		"Contenido de la notificación",
			"datetime":	"2014-09-03 13:10:00",
			"img":		"http://url/de/la/imagen",
			"url":		null,
			"user_id":	user_id,
			"read":		true
		},
	]

	// Obtiene los x primeros elementos del array
	notices = notices.splice(0, num_items);

	res
		.status(200)
	    .set('Content-Type','application/json')
	    .json({
	      notices: notices
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