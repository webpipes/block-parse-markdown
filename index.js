var _ = require('underscore'),
	marked = require('marked'),
	express = require('express'),
	app = express();

app.use(express.bodyParser());

// Simple logger
app.use(function (request, response, next) {
	console.log('%s %s', request.method, request.url);
	next();
});

// Handle uncaughtException
process.on('uncaughtException', function (error) {
	exit('Error: ' + error.message);
});

var exit = function (message) {
	if (message) {
		console.log(message);
	}
	console.log('Exiting...');
	process.exit(1);
};

app.options('/', function (request, response) {

	// CORS support
	response.set('Access-Control-Allow-Origin', '*');
	response.set('Access-Control-Allow-Methods', 'OPTIONS,POST');
	response.set('Access-Control-Allow-Headers', 'Content-Type');

	// The block definition
	response.send({
		name: "Parse Markdown",
		description: "Converts Markdown to HTML.",
		inputs: [{
			name: "markdown",
			type: "string",
			description: "Markdown-formatted content for transformation."
		}],
		outputs: [{
			name: "html",
			type: "string",
			description: "HTML-converted data."
		}]
	});
});

app.post('/', function (request, response) {

	if (!_.has(request.body, 'inputs')) {
		exit('WebPipe "input" is missing or formatted incorrectly.');
	}

	var inputs = request.body.inputs;
	var outputs = {
		outputs: []
	};
	
	// Verify POST keys exist
	if (!_.has(inputs, 'markdown')) {
		exit('Email "to" address is missing.');
	}
	
	var html = marked(inputs.markdown);
	if (!html) {
		console.log('Failed to convert markdown.');
		response.send(500);
	} else {
		outputs.outputs.push({
			html: html
		});
		response.json(outputs);
	}
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log('Listening on ' + port);
});