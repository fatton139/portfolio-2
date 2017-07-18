var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var lessMiddleware = require('less-middleware');
var mocha = require('mocha');

var index = require('./routes/index');
var users = require('./routes/users');
var works = require('./routes/works');

var app = express();

var database = require('./database');

// compile less
app.use(lessMiddleware(__dirname + '/public'));

app.use('/bower_components', express.static(__dirname + '/bower_components'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/Works', works);

if (app.get('env') === 'development') {
  var newItem = require('./routes/newitem');
  var editItem = require('./routes/edititem');
  app.use('/newitem', newItem);
  app.use('/edititem', editItem)
  var fs = require('fs');
  var data = JSON.parse(fs.readFileSync('routes/data.json', 'utf8'))

  database.connectDb(function(err) {
    if (err) throw err;
    var db = database.getDb();
    //database.insertCollection('items', {});
    db.collection('items').find({}).toArray(function(err, result) {
        //console.log(result)
    });
    //db.collection('dataTemplates').remove();
    //db.collection('items').remove();
    //database.insertCollection('dataTemplates', data.Templates);

  });
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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