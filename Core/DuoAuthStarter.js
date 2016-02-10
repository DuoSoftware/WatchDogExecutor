/**
 * Created by Kalana on 2/1/2016.
 */

var shell = require('shelljs/global');

var sh = require('shelljs');
//var version = sh.exec('node --version', {silent:true}).output;
//console.log('version ' + version);

function restart(response){

    //'docker ps | grep "<name of the image>"
    var ps = sh.exec('docker ps | grep "auth"', {silent:true}).output;
    //console.log(ps);

    if(ps!=undefined){

        var res = ps.split(" ");
        //console.log(res[36]);

        var pid = sh.exec('docker top '+res[0]+' | grep duoauth',{silent:true}).output;
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
            //       4. Name and the path of the ObjectStore executable should not change incase of updates

            console.log('\nRestarting Duo Auth...');
            sh.exec('docker exec -d -it'+res[0]+' /home/DuoV6_Auth/duoauth',{silent:false}).output;

            console.log('Duo Auth Successfully started.');
            //console.log();

            response({'success':true,'message':'Duo Auth has been successfully restarted'});

        }
        else{
            response({'success':false,'message':'Duo Auth has to be started to Restart'})
        }


    }
    else{
        response({'success':false,'message':'Docker image for Duo Auth not available'})
    }



}


function start(response){



    var ps = sh.exec('docker ps -q', {silent:true}).output;
    var psarray = ps.split("\n");
    psarray=psarray.filter(Boolean);

    if((data.dockerip != 'undefined') && (psarray!=null)){

        for (var i in psarray) {

            var process = sh.exec('docker inspect ' + psarray[i] + ' | grep '+data.dockerip, {silent: true}).output;

            if(process!=''){
                console.log(psarray[i]+ ' is the correct container');

                //sh.exec('sudo su',{silent:false});
                var pid = sh.exec('docker top '+psarray[i].trim()+' | grep DuoAuth',{silent:false}).output;

                //console.log('This is the process'+ pid);

                if(pid!=''){
                    var realpid = pid.split(" ");

                    //Killing the externally attahced process of the Docker internal Process
                    console.log('KILLING... '+realpid[16]);
                    sh.exec('kill '+realpid[16],{silent:true}).output;
                    console.log('Succesfully Executed');

                    //NOTE : 1. all dependencies of file should be in the root Directory
                    //       2. 'docker exec -d'+res[0]+'<path to Objectstore executable>'
                    //       3. docker exec -d , -d is to detach from process after execute
                    //       4. Name and the path of the ObjectStore executable should not change in case of updates

                    console.log('\nRestarting ObjectStore...');
                    sh.exec('docker exec -d -it'+psarray[i]+' /home/DuoV6_Object/ObjectStore-loadtest',{silent:true}).output;

                    console.log('ObjectStore Successfully started.');
                    //console.log();

                    response({'success':true,'message':'ObjectStore has been successfully restarted'});

                }
                else{
                    response({'success':false,'message':'Object Store has to be started to Restart'})
                }
            }

        }
    }
    else{
        response({'success':false,'message':'Docker IP not defined'})
    }





}




exports.restart=restart;
