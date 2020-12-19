var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var actsRouter = require('./routes/actividades');
var prodRouter = require('./routes/producto');
var pedRouter = require('./routes/pedido');
var mongoose = require('mongoose');

var app = express();


//variables
var mongoDB = 'mongodb://127.0.0.1:27017/taller2';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};

app.use(requestTime);


//BD
//mongoose.connect(mongoDB);
mongoose.connect('mongodb://localhost/taller2', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


//app.use('/', indexRouter);
app.use('/actividades', actsRouter);
app.use('/producto', prodRouter);
app.use('/pedido', pedRouter);
//app.use('/users', usersRouter);

app.get('/', function (req, res) {
  //res.send('Hello World!');
  console.log(req.requestTime);
  res.render('principal.ejs');
  //res.send();
});


app.get('/main', function (req, res) {
  //res.send('Hello World!');
  console.log(req.requestTime);
  res.render('actividades.ejs');
  //res.send();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
