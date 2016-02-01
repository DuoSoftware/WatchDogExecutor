/**
 * Created by Kalana on 2/1/2016.
 */

var DuoAuth = require('../Core/DuoAuthStarter');
var ObjectStore = require('../Core/ObjecstoreStarter');




function reStartObjectStore(response){

    ObjectStore.restart(function(found){
        if(found.success==true){

            console.log(found.message);
            response(found.message);

        }
        if(found.success==false){

            console.log(found.message);
            response(found.message);

        }

    });
}

function reStartDuoAuth(response){

    DuoAuth.restart(function(found){
        if(found.success==true){

            console.log(found.message);
            response(found.message);

        }
        if(found.success==false){

            console.log(found.message);
            response(found.message);

        }

    });
}

exports.reStartObjectStore=reStartObjectStore;
exports.reStartDuoAuth=reStartDuoAuth;