/**
 * Created by Kalana on 2/1/2016.
 */

var DuoAuth = require('../Core/DuoAuthStarter');
var ObjectStore = require('../Core/ObjecstoreStarter');




function reStartObjectStore(data, response){


    ObjectStore.restart(data, function(found){

        if(found.success==true){
            console.log(found);
            response(found);

        }
        else{
            console.log(found);
            response(found);

        }

    });
}

function reStartDuoAuth(response){

    DuoAuth.restart(function(found){
        if(found.success==true){

            console.log(found);
            response(found);

        }
        if(found.success==false){

            console.log(found);
            response(found);

        }

    });
}

exports.reStartObjectStore=reStartObjectStore;
exports.reStartDuoAuth=reStartDuoAuth;