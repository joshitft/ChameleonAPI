let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let app = express(),
    cors = require('cors');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(require('./authenticate/apiKeyCheck').middleware);
// app.use('/',)
app.use('/', require('./routes'));

module.exports = app;
