var params = require("./params");

var config = {
    "http_port":        Number(process.env.PORT || params.http_port || 2100),
    "mongodb_host":     process.env.MONGODBHOST || params.mongodb_host || "localhost",
    "mongodb_port":     process.env.MONGODBPORT || params.mongodb_port || "27017",
    "mongodb_dbname": 	process.env.MONGODBNAME || params.mongodb_dename || "notijs"
};

module.exports = config;