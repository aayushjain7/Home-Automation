var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var cors = require('cors');
var dotenv = require('dotenv').config();
var dotenvExpand = require('dotenv-expand');
console.log(dotenv.parsed);
dotenvExpand(dotenv);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const mongoose = require('mongoose');
const connect = mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});

connect.then(
	(db) => {
		console.log('Connected correctly to the Server :)');
		console.log("Connected correctly to the MongoDB :')");
	},
	(err) => {
		console.log(err);
	}
);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(express.static('client/build'));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//if (process.env.NODE_ENV === 'production') {
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});
//}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('../views/error.jade');
});

module.exports = app;
