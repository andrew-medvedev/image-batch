/**
 * Created by ihatemicro$oft on 20.07.2016.
 */

'use strict';

module.exports = doResolve;

var fs = require('fs'),
    path = require('path');

function doResolve(basedir, targetName, callback){
    targetName = targetName.split('.');
    function listAllFiles(){
        var callbackFn = function(err, files){
            if(err){
                callback(err);
            } else {
                files = files.map(function(filename){ return path.basename(filename).split('.'); });
                chooseNewName(files);
            }
        };

        fs.readdir(basedir, callbackFn);
    }
    function chooseNewName(files){
        var counter = 0,
            resultName;

        resultName = targetName[0] + '.' + targetName[1];
        if(!checkFilename(files, resultName)){
            counter++;
            do{
                resultName = targetName[0] + '-' + counter + '.' + targetName[1];
                if(!checkFilename(files, resultName)){
                    resultName = null;
                    counter++;
                }
            } while(!resultName);
        }

        callback(null, resultName);
    }
    function checkFilename(files, fileName){
        for(var i = 0 ; i < files.length ; i++){
            if(files[i][0] + '.' + files[i][1] === fileName){
                return false;
            }
        }

        return true;
    }

    listAllFiles();
}