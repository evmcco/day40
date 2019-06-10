const express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    es6Renderer = require('express-es6-template-engine'),
    logger = require('morgan');

const indexRouter = require('./routes/index'),
    booksRouter = require('./routes/books'),
    usersRouter = require('./routes/users');

var app = express();

app.set('views', './views');
app.engine('html', es6Renderer);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'get rad',
    resave: false,
    saveUninitialized: true,
    is_logged_in: false
}))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/books', booksRouter);

module.exports = app;
