var request = require('supertest-as-promised');
var api = require('../index.js');
var params = require('../config/params');
var _ = require('lodash');
var mongoose = require('mongoose');

request = request(api);

describe("NotiJS Test", function(){

	// Conectarse a MongoDB Antes de realizar las pruebas
	before(function(done) {
		mongoose.connect("mongodb://"+ params.mongodb_host +":"+ params.mongodb_port +"/"+ params.mongodb_dbname, done);
	});

	// Desconectarse de MongoDB al finalizar las pruebas
	after(function(done) {
		mongoose.disconnect(done);
		mongoose.models = {};
	});


	describe("Listados de notificaciones", function(){

		it("Debería traer la lista completa de notificaciones del usuario GET [/notices/1]", function(done){
			request
				.get("/notice/list/1")
				.set('Accept', 'application/json')
				.expect(200)
				.expect('Content-Type', /application\/json/)
				.end(function(err, res){

					var body = res.body;
					var notices;

					// Validar que exista la propiedad notices
					expect(body).to.have.property('notices');	
					notices = body.notices;

					// Validar que notices sea un array
					expect(notices).to.be.an('array');

					// Validar que las notificaciones tengan user_id = 1
					//var founds = _.where(notices, { 'user_id': '1' });
	                //expect(founds).to.have.length(notices.length);
	    
	                // Validar que todas las notificaciones tengan las propiedades y el user_id sea 1
	                _.forEach(notices, function(notice){
	                    expect(notice).to.have.property('_id');
	                    expect(notice).to.have.property('title');
	                    expect(notice).to.have.property('body');
	                    expect(notice).to.have.property('datetime');
	                    expect(notice).to.have.property('img');
	                    expect(notice).to.have.property('url');
	                    expect(notice).to.have.property('user_id', 1);
	                    expect(notice).to.have.property('read');
	                });

					done(err);
				});
		});

		it("Debería traer la lista de máximo 10 notificaciones del usuario GET [/notices/1/10]", function(done){
			request
				.get("/notice/list/1/10")
				.set('Accept', 'application/json')
				.expect(200)
				.expect('Content-Type', /application\/json/)
				.end(function(err, res){

					var body = res.body;
					var notices;

					// Validar que exista la propiedad notices
					expect(body).to.have.property('notices');	
					notices = body.notices;

					// Validar que notices sea un array
					expect(notices).to.be.an('array');

					// Validar que sean máximo 10 notificaciones
					expect(notices).to.have.length.below(11);
	    
	                // Validar que todas las notificaciones tengan las propiedades y el user_id sea 1
	                _.forEach(notices, function(notice){
	                    expect(notice).to.have.property('_id');
	                    expect(notice).to.have.property('title');
	                    expect(notice).to.have.property('body');
	                    expect(notice).to.have.property('datetime');
	                    expect(notice).to.have.property('img');
	                    expect(notice).to.have.property('url');
	                    expect(notice).to.have.property('user_id', 1);
	                    expect(notice).to.have.property('read');
	                });

					done(err);
				});
		});
	});
	
	describe("Número de notificaciones sin leer", function(){
		it("Debería obtener el número de notificaciones sin leer GET [/notice/unread/1]", function(){
			request
				.get("/notice/unread/1")
				.expect(200)
				.expect('Content-Type', /application\/json/)
				.end(function(err, res){
					var body = res.body;

					// Validar que exista la propiedad notices
					expect(body).to.have.property('unread');

					// Validar que unread sea un entero
					expect(body.unread).to.be.an('number');
				});
		});
	});

	describe("Crear notificación", function(){

		it("Debería crear una notificación POST [/notice]", function(done){
			var data = {
				"notice":{
					"title": 	"Nueva notificación",
					"body": 	"Contenido de la nueva notificación",
					"img":		"/imgs/image.jpg",
					"url": 		"http://google.com",
					"user_id": 	1	
				}
			}

			request
				.post("/notice")
				.set('Accept', 'application/json')
	        	.send(data)
	        	.expect(201)
	        	.expect('Content-Type', /application\/json/)
	        	.end(function(err, res) {
	    			var body = res.body;

	    			// Verificar que la notificación existe en la respuesta
	    			expect(body).to.have.property("notice");

	    			var notice = body.notice;

	    			// Verificar que la notificación tiene todas las propiedades que se enviaron
	    			expect(notice).to.have.property("title", data.notice.title);
	    			expect(notice).to.have.property("body", data.notice.body);
	    			expect(notice).to.have.property("img", data.notice.img);
	    			expect(notice).to.have.property("url", data.notice.url);
	    			expect(notice).to.have.property("user_id", data.notice.user_id);
	    			expect(notice).to.have.property("read", false);
	    			expect(notice).to.have.property("datetime");
	    			expect(notice).to.have.property("_id");
	    			
	    			done(err);
	        	});
		});
	});

	describe("Marcar notificación como leída", function(){

		it("Debería marcar una notificación como leida POST [/notice/read]", function(done){
			
			var user_id = 1;
			var data = {
				"notice":{
					"title": 	"notificación de prueba",
					"body": 	"Notificación para marcar como leida",
					"user_id": 	user_id	
				}
			}

			// Enviar petición para crear nueva notificación
			request
				.post("/notice")
				.set('Accept', 'application/json')
	        	.send(data)
	        	.expect(201)
	        .then(function(res){
	        	// Obtener id de notificación creada
	        	var id = res.body.notice._id;
	        	var mark = {
	        		"mark_as_read":{
	        			"_id": 		id,
	        			"user_id": 	user_id
	        		}
	        	};

	        	// Enviar petición para marcar notificación como leída
				return request.patch("/notice/read")
					.send(mark)
		        	.expect(200)
		        	.expect('Content-Type', /application\/json/)		        	
	        }, done)
	        .then(function(res){
	        	// Obtener número de notificaciones marcadas
	        	var body = res.body;

	        	// Validar que exista afected y sea 1
	        	expect(body).to.have.property('afected', 1);

	        	done();
	        }, done);
		});

		it("Debería marcar todas las notificaciones del usuario como leidas POST [/notice/read]", function(done){
			var data = {
				"mark_as_read":{
					"user_id":  1,
				}
			};

			request.patch("/notice/read")
				.send(data)
	        	.expect(200)
	        	.expect('Content-Type', /application\/json/)
	        	.end(function(err, res) {
					// Obtener número de notificaciones marcadas
		        	var body = res.body;

		        	// Validar que exista afected
		        	expect(body).to.have.property('afected');

		        	// Validar que afected se un entero
		        	expect(body.afected).to.be.an('number');

	        		done(err);
	        	});
		});
	});

	describe("Eliminar notificaciones", function(){

		it("Debería eliminar una notificación DELETE [/notice]", function(done){
			var user_id = 1;
			var data = {
				"notice":{
					"title": 	"notificación de prueba",
					"body": 	"Notificación para eliminar",
					"user_id": 	user_id	
				}
			}

			// Enviar petición para crear notificación 
			request
				.post("/notice")
				.set('Accept', 'application/json')
	        	.send(data)
	        	.expect(201)
        	.then(function(res){
				// Obtener id de notificación creada
	        	var id = res.body.notice._id;
				var delete_data = {
					"delete":{
						"_id":		id,
						"user_id":	user_id
					}
				};

				// Enviar petición para eliminar notificación
				return request.delete("/notice")
					.set('Accept', 'application/json')
					.send(delete_data)
					.expect(200)
					.expect('Content-Type', /application\/json/)				
        	}, done)
        	.then(function(res){
        		var body = res.body;

	        	// Validar que exista deleted y sea 1
	        	expect(body).to.have.property('deleted', 1);

        		done();
        	}, done);

		});

		it("Debería eliminar todas las notificaciones del usuario DELETE [/notice]", function(done){
			var data = {
				"delete":{
					"user_id":	1
				}
			};

			request.delete("/notice")
				.send(data)
				.expect(200)
				.expect('Content-Type', /application\/json/)
				.end(function(err, res) {
					var body = res.body;

		        	// Validar que exista deleted
		        	expect(body).to.have.property('deleted');

		        	// Validar que afected se un entero
		        	expect(body.deleted).to.be.an('number');

	        		done(err);
	        	});
		});
	});

	describe("Enviar notificaciones instantáneas", function(){

		it("Debería enviar una notificación instantánea a todos los usuarios", function(done){
			var data = {
				"notice":{
					"title": 	"Nueva notificación",
					"body": 	"Contenido de la nueva notificación",
					"img":		"/imgs/image.jpg",
					"url": 		"http://google.com"
				}
			};

			request
				.post("/notice/flash")
				.set('Accept', 'application/json')
	        	.send(data)
	        	.expect(200)
	        	.end(function(err, res) {
	        		done(err);
	        	});
		});


		it("Debería enviar una notificación instantánea a usuarios específicos", function(done){
			var data = {
				"notice":{
					"title": 	"Nueva notificación",
					"body": 	"Contenido de la nueva notificación",
					"img":		"/imgs/image.jpg",
					"url": 		"http://google.com"
				},
				"users": [1, 2, 3]
			};

			request
				.post("/notice/flash")
				.set('Accept', 'application/json')
	        	.send(data)
	        	.expect(200)
	        	.end(function(err, res) {
	        		done(err);
	        	});
		});
	});

});