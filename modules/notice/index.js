/**
* Module dependencies
*/
var express = require('express');
var app = express();

app.get('/notices/:user_id', function(req, res){  

	var user_id = req.params.user_id;
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
	]

	res
		.status(200)
	    .set('Content-Type','application/json')
	    .json({
	      notices: notices
	    });
});

module.exports = app;