var mongoose = require('mongoose');

module.exports = function(uri) {

	mongoose.connect(uri, {
	  useMongoClient: true
	  /* other options */
	});

	mongoose.connection.on('connected', function() {
	console.log('Mongoose! Connected on ' + uri);
	});

	mongoose.connection.on('disconnected', function() {
	console.log('Mongoose! Disconnected from ' + uri);
	});

	mongoose.connection.on('error', function(erro) {
	console.log('Mongoose! Connection error!  : ' + erro);
	});

	process.on('SIGINT', function() {
		mongoose.connection.close(function() {
		console.log('Mongoose! Disconnect by the end of application!');
		process.exit(0);
		});
	});

}