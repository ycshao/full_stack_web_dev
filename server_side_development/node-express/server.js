var express = require('express');
var morgan = require('morgan');
var dishRouter = require('./dishRouter');
var promotionRouter = require('./promotionRouter');
var leaderRouter = require('./leaderRouter');

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));

app.use('/dishes', dishRouter);
app.use('/promotions', promotionRouter);
app.use('/leaders', leaderRouter);

app.use(express.static(__dirname + '/public'));

app.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});
