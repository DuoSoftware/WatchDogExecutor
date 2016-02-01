/**
 * Created by Kalana on 1/25/2016.
 */

var shell = require('shelljs/global');

var sh = require('shelljs');
//var version = sh.exec('node --version', {silent:true}).output;
//console.log('version ' + version);

function restart(response){

    //'docker ps | grep "<name of the image>"
    var ps = sh.exec('docker ps | grep "objectstore"', {silent:true}).output;

    //console.log(ps);

    if(ps!='undefined'){

        var res = ps.split(" ");
        //console.log(res[36]);

        var pid = sh.exec('docker top '+res[0]+' | grep ObjectStore',{silent:true}).output;
        //console.log(pid);

        if(pid!='undefined'){
            var realpid = pid.split(" ");

            //Killing the externally attahced process of the Docker internal Process
            console.log('KILLING... '+realpid[16]);
            sh.exec('sudo kill '+realpid[16],{silent:true}).output;
            console.log('Succesfully Executed');

            //NOTE : 1. all dependencies of file should be in the root Directory
            //       2. 'docker exec -d'+res[0]+'<path to Objectstore executable>'
            //       3. docker exec -d , -d is to detach from process after execute
            //       4. Name and the path of the ObjectStore executable should not change in case of updates

            console.log('\nRestarting ObjectStore...');
            sh.exec('docker exec -d -it'+res[0]+' /home/DuoV6_Object/ObjectStore-loadtest',{silent:false}).output;

            console.log('ObjectStore Successfully started.');
            //console.log();

            response({'success':true,'message':'ObjectStore has been successfully restarted'});

        }
        else{
            response({'success':false,'message':'Object Store has to be started to Restart'})
        }


    }
    else{
        response({'success':false,'message':'Docker image for ObjectStore not available'})
    }

}




exports.restart=restart;
