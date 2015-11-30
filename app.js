var express = require('express'),
	session = require('express-session'),
	path = require('path'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	favicon = require('serve-favicon'),
	config = require('./config/default'),
	hbs = require('hbs');

//var models = require('./models');

var app = express(),
	server = require('http').createServer(app);

app.set('port', config['server'].port);

app.use(favicon('./public/images/favicon.png'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
	secret: 'someCoolSecret',
	cookie: { maxAge: 24 * 60 * 60 * 1000 * 365 },
	resave: false,
	saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs')
app.set('view options', {
	layout: '/layouts/default.hbs'
});

var index = require('./routes/index.js');
app.use('/', index);

server.listen(app.get('port'), function() {
	console.log('Web app is operating on port ' + app.get('port'));
});