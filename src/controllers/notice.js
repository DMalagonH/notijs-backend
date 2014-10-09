/**
 * Module dependencies
 */
var express = require('express');
var v = require('validate-obj');

var app = express();

// Modelo
var Model = require("../models/notice");

module.exports = function(io){

	
	// Expresiones de validación para parametros enviados en los request
	var RequestValExp = {
		createNotice: {
			title: 		[v.required, v.isString],
			body: 		[v.required, v.isString],
			img: 		[v.isString],
			url: 		[v.isString],
			user_id: 	[v.required, v.isString]
		},
		markAsRead: {
			id:			[v.isString],
			user_id: 	[v.required, v.isString]
		},
		deleteNotice: {
			id:			[v.isString],
			user_id: 	[v.required, v.isString]
		},
		createNoticeFlash: {
			title: 		[v.required, v.isString],
			body: 		[v.required, v.isString],
			img: 		[v.isString],
			url: 		[v.isString]
		},
	};

	/**
	 * Función para enlistar notificaciones
	 */
	var getList = function(req, res){
	    var user_id = parseInt(req.params.user_id);
	    var num_items = parseInt(req.params.num_items) || null;

	    // Obtener notificaciones del usuario ordenadas por fecha descendentemente y con el límite indicado
	    Model.find({
	    	"user_id": user_id
	    })
	    .sort({
			datetime: -1
		})
		.limit(num_items)
		.exec(function(err, notices){
			if(!err){
		    	// Response
		    	res.status(200)
				.set('Content-Type','application/json')
				.json({
					notices: notices
				});			
			}
			else {
		    	res.status(500).send();
	  		}
	    });
	};

	/**
	 * Función para obtener número de notificaciones sin leer
	 */
	var getUnread = function(req, res){	
		var user_id = parseInt(req.params.user_id);

		Model.count({
			"user_id": 	user_id, 
			"read": 	false
		})
		.exec(function(err, count){
			if(!err){
				res.status(200)
				.set('Content-Type','application/json')
				.json({
					"unread": count
				});	
			}
			else {
		    	res.status(500).send();
	  		}
		});
	};

	/**
	 * Función para crear una notificacion
	 */
	var create = function(req, res){
		// Obtener datos del request
		var data = req.body;
		var new_notice = data.notice;

		// Validar parámetros del request
		var val_errs = v.hasErrors(new_notice, RequestValExp.createNotice);
		if(!val_errs){
			// Registrar notificación en MongoDB
			Model.create(new_notice, function(err, notice){
				if(!err){
					// Response
					res.status(201)
					.json({
						notice: notice.toJSON()
					});
				}
				else{
					res.status(500).send();
				}
			});	
		}
		else{
			res.status(400).json({
				errors: val_errs
			});
		}
	};

	/**
	 * Función para marcar notificaciones como leídas
	 */
	var markAsRead = function(req, res){
		// Obtener datos del request
		var data = req.body;
		var marks = data.mark_as_read;

		// Validar parámetros del request
		var val_errs = v.hasErrors(marks, RequestValExp.markAsRead);
		if(!val_errs){

			var user_id = marks.user_id;
			
			// Preparar datos de consulta
			var find = {
				"user_id": 	user_id,
				"read": 	false
			};
			if(typeof(marks.id) !== "undefined"){
				find._id = marks.id;
			}

			Model.update(find, 
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
				if(!err){
					res.status(200)
					.set('Content-Type','application/json')
					.json({
						"afected": num_afected
					});
				}
				else{
					res.status(500).send();
				}
			});
		}
		else{
			res.status(400).json({
				errors: val_errs
			});
		}
	};

	/**
	 * Función para eliminar notificaciones
	 */
	var deleteNotice = function(req, res){
		// Obtener datos del request
		var data = req.body;
		var marks = data.delete;
		var user_id = marks.user_id;

		// Validar parámetros del request
		var val_errs = v.hasErrors(marks, RequestValExp.deleteNotice);

		if(!val_errs){
			// Preparar datos de consulta
			var find = {
				"user_id": 	user_id,
			};
			if(typeof(marks.id) !== "undefined"){
				find._id = marks.id;
			}

			Model.remove(find)
			.exec(function(err, num_deleted){
				if(!err){
					res.status(200)
					.set('Content-Type','application/json')
					.json({
						"deleted": num_deleted
					});
				}
				else{
					res.status(500).send();
				}
			});
		}
		else{
			res.status(400).json({
				errors: val_errs
			});
		}
	};

	/**
	 * Función para enviar notificaciones instantáneas
	 */
	var createFlash = function(req, res){
		var data = req.body;
		var flash_notice = data.notice;

		// Validar parámetros del request
		var val_errs = v.hasErrors(flash_notice, RequestValExp.createNoticeFlash);

		if(!val_errs){

			res.status(200).send();
		}
		else{
			res.status(400).json({
				errors: val_errs
			});
		}
	};

	app.get('/notice/list/:user_id/:num_items?', getList);
	app.get("/notice/unread/:user_id", getUnread);
	app.post("/notice", create);
	app.patch("/notice/read", markAsRead);
	app.delete("/notice", deleteNotice);
	app.post("/notice/flash", createFlash);


	return app;
}