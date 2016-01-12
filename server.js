var util = require('util'),
    express = require('express'),
    expressValidator = require('express-validator'),
    app = express(),
    email = require("./node_modules/emailjs/email"),
    lessMiddleware = require('less-middleware'),
    mustache = require('mustache'),
    fs = require('fs'),
    path = require('path'),
    ExifImage = require('exif').ExifImage;

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

app.use(lessMiddleware(__dirname + '/public', {force: true}));
app.use(express.static(__dirname + '/public'));

var engines = require('consolidate');
app.engine('html', engines.mustache);
app.set('views', __dirname + '/views')
app.set('view engine', 'html');

app.get('/v2', function(req, res) {
    console.log("sending html");
    var files = (fs.readdirSync(__dirname + '/public/images/gallery'));

    var images = Array();
    for (var i in files) {
        if(path.extname(files[i]) === ".jpg") {
            images.push(files[i]);
        }
    }

    var responseJson = Array();

    for (var i = 0; i < images.length; i++) {
        var imgName = images[i];
        getImageExif(imgName, function(exifData, name) {
            //console.log("imgpath: " + imgPath);
            responseJson.push({
                path: '/images/gallery/' + name,
                year: exifData.exif.CreateDate.substr(0, 4),
                name: name.split('.jpg')[0],
                exif: exifData.exif
            });

            if (responseJson.length >= images.length) {
                responseJson = responseJson.sort(alphabeticalCompare);
                console.log(responseJson);
                res.render('index', { images: responseJson});
            }
        });
    }
});

function alphabeticalCompare(a,b) {
    if (a.name < b.name)
        return -1;
    else {
        return 1;
    }
}

function getImageExif(imgName, callback) {
    try {
        new ExifImage({ image : __dirname + '/public/images/gallery/' + imgName }, function (error, exifData) {
            if (error) {
                console.log('Image: ' + imgName + ' - Error: '+error.message);
            } else {
                callback(exifData, imgName);
            }
        });
    } catch (error) {
        console.log('Error: ' + error.message);
    }
}

app.post('/message', function(req, res){

	req.sanitize('name').xss();
	req.sanitize('email').xss();
	req.sanitize('message').xss();

	req.assert('name', 'Please enter your name').notEmpty();
	req.assert('email', 'Please enter a valid email').isEmail();
	req.assert('message', 'Please enter your message').notEmpty();
	var name = req.param('name');
	var email_address = req.param('email');
	var message_content = req.param('message');
	var copy = req.param('copy');

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
	   password:"",
	   host:    "smtpout.secureserver.net",
	   ssl:     true

	});

	// send the message and get a callback with an error or details of the message that was sent
	server.send({
	   text:    message_content,
	   from:    name+" <"+email_address+">",
	   to:      "Kaijian Gao <kaijian_gao@brown.edu>",
	   cc:      "Website <contact@kaijiangao.com>",
	   subject: "Message from website"
	}, function(err, message) {
		// send a copy of the message if copy is requested
		if(copy != undefined && copy == 'on'){
			server.send({
			   text:    "This email is a confirmation that you have sent the following message to Kaijian Gao: \n" + message_content,
			   from:    "Kaijian Gao <contact@kaijiangao.com>",
			   to:      name+" <"+email_address+">",
			   cc:      "",
			   subject: "Confirmation for the message you sent to Gao"
			}, function(err, message) { console.log(err || message); });
		}

		console.log(err || message);
		if(err){
			console.log('=====Error message!!=====: '+err);
			res.send('Failed to send message because of error: '+err, 500);
		} else {
			//success!
			res.json({
				response: 'message has been sent!'
			});
		}
	});
});

app.listen(3000, '', '', function(){
	console.log('- website running on port 3000');
});
