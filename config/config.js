var params = require("./params");

var config = {
    "http_port":        Number(process.env.PORT || params.http_port || 2100),
    "mongodb_host":     process.env.MONGODBHOST || params.mongodb_host || "localhost",
    "mongodb_port":     process.env.MONGODBPORT || params.mongodb_port || "27017",
    "mongodb_dbname": 	process.env.MONGODBNAME || params.mongodb_dbname || "notijs",
    "mongodb_user": 	process.env.MONGODBUSER || params.mongodb_user || "",
    "mongodb_password": process.env.MONGODBPASSWORD || params.mongodb_password || ""
};

module.exports = config;