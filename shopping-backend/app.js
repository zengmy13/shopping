const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const connectDB = require('./db/index');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const ordersRouter = require("./routes/orders")
const uploadRouter = require("./routes/uploads")


const app = express();

connectDB()

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
    const error = new Error("not found");
    res.status(404);
    next(error);
});

// error handler
app.use(function (err, req, res, next) {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack
    })
});

module.exports = app;
