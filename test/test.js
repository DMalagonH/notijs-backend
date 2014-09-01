var request = require('supertest');
var api = require('../index.js');
//var host = process.env.API_TEST_HOST || api;

request = request(api);
