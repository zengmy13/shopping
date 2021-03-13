var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var connectdb = require('./db/index');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var ordersRouter = require("./routes/orders")
var uploadRouter = require("./routes/uploads")


var app = express();

connectdb()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/upload', uploadRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var error = new Error("not found");
    res.status(404);
    next(error);
});

// error handler
app.use(function (err, req, res, next) {
    var statusCode = res.statusCode == 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack
    })
});

module.exports = app;
