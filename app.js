var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var fs = require('fs');

var modMan= require('./Control/ModuleManager')

var app = express();


app.set('port', process.env.PORT || 7001);

app.get('/', function(req, res){
    res.send('Execution Time...');
});

app.post('/restartobjectstore', function(req, res){

    console.log(req.query);
    //TODO: Should check a Token before executing method

    modMan.reStartObjectStore(function(found){
        res(found);
    });

    //res.send('dssd');
});

app.post('/restartduoauth', function(req, res){

    //TODO: Should check a Token before executing method

    modMan.reStartDuoAuth(function(found){
        res(found);
    });

    //res.send('dssd');
});




http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
