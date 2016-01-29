var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var fs = require('fs');

var obstore= require('./Core/ObjecstoreStarter')

var app = express();


app.set('port', process.env.PORT || 7001);

app.get('/', function(req, res){
    res.send('Execution Time...');
});

app.post('/startOBstore', function(req, res){

    //Should check a Token before executing method

    obstore.restart(function(found){
        res.json({'success':found});
    });

    //res.send('dssd');
});




http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
