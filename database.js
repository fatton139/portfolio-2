var MongoClient = require('mongodb').MongoClient;
var URICS = "mongodb://tonyli139:RDyMScAWKpj0Fl1O@p2cluster-shard-00-00-ccvtw.mongodb.net:27017,p2cluster-shard-00-01-ccvtw.mongodb.net:27017,p2cluster-shard-00-02-ccvtw.mongodb.net:27017/<DATABASE>?ssl=true&replicaSet=p2Cluster-shard-0&authSource=admin";
var db;

connectDb = function(callback) {
	MongoClient.connect(URICS, function(err, database) {
		if (err) throw err;
		db = database;
		console.log('connected');
		return callback(err);
	});
}

getDb = function() {
	return db;
}


}

module.exports = {
	connectDb,
}

