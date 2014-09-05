var request = require('supertest');
var api = require('../index.js');
var _ = require('lodash');
//var host = process.env.API_TEST_HOST || api;

request = request(api);

describe("Listado de notificaciones [/notas/1]", function(){

	it("Deberia traer la lista completa de notificaciones del usuario [/notices/1]", function(done){
		request
			.get("/notices/1")
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
                    expect(notice).to.have.property('user_id', '1');
                    expect(notice).to.have.property('read');
                });

				done(err);
			});
	});
});