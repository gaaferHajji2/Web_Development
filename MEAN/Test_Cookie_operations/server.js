var app = require('express')();
var cookieParser = require('cookie-parser');
var morgan = require('morgan');

app.use(cookieParser());
app.use(morgan('dev'));

require('./routes.js')(app);

app.listen(3000);
