var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var fs = require('fs');

var app = express();
app.use(bodyParser.json());
app.set('port', process.env.PORT || 7001);


var modMan= require('./Control/ModuleManager')


//app.use(bodyParser.json());



app.post('/', function(req, res){

    console.log('Test Request received');
    res.send('Execution Time...');
});

app.post('/restartobjectstore', function(req, res){

    //console.log(req.body);
    //res.send('Executed');



    //TODO: Should check a Token before executing method

    modMan.reStartObjectStore(req.body,function(found){

        if(found.success==true){
            res.status(200).json(found)
        }

        else{
            res.status(400).json(found)
        }
    });

    //res.send('dssd');
});

app.post('/restartduoauth', function(req, res){

    //TODO: Should check a Token before executing method

    modMan.reStartDuoAuth(function(found){

        if(found.success!=true){
            res.status(200).json(found)
        }

        else{
            res.status(400).json(found)
        }

    });

    //res.send('dssd');
});



http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

