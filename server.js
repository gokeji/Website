var util = require('util'),
    express = require('express'),
    expressValidator = require('express-validator'),
    app = express(),
    email = require("./node_modules/emailjs/email");

app.use(express.bodyParser());
app.use(expressValidator());

app.use(express.static(__dirname + '/public'));

app.post('/message', function(req, res){

	

	req.sanitize('name').xss();
	req.sanitize('email').xss();
	req.sanitize('message').xss();

	req.assert('name', 'Please enter your name').notEmpty();
	req.assert('email', 'Please enter a valid email').isEmail();
	req.assert('message', 'Please enter your message').notEmpty();
	var name = req.param('name');
	var email_address = req.param('email');
	var message = req.param('message');

	var mappedErrors = req.validationErrors();

	if(mappedErrors){
		console.log(mappedErrors);
		// console.log('There have been validation errors: ' + util.inspect(mappedErrors));
		res.send(util.inspect(mappedErrors), 422);

		return;
	}

	console.log('form entry success');

	// send email
	var server  = email.server.connect({
	   user:    "contact@kaijiangao.com", 
	   password:"migtruelymig", 
	   host:    "smtpout.secureserver.net", 
	   ssl:     true

	});

	// send the message and get a callback with an error or details of the message that was sent
	server.send({
	   text:    message, 
	   from:    name+" <"+email_address+">", 
	   to:      "Kaijian Gao <kaijian_gao@brown.edu>",
	   cc:      "Website <contact@kaijiangao.com>",
	   subject: "Message from website"
	}, function(err, message) { console.log(err || message); });

	res.json({
		response: 'message has been sent!'
	});


});

app.listen(3000, function(){
	console.log('- website running on port 3000');
});