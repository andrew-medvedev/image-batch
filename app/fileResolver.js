/**
 * Created by ihatemicro$oft on 17.07.2016.
 */

'use strict';

module.exports = {
    list: list
};

var _ = require('underscore'),
    fs = require('fs');

function list(argumentsObj) {
    function prepareArguments(){
        if(!_.isUndefined(argumentsObj['extension'])){
            var extensionObj = {};
            if(!_.isUndefined(argumentsObj['extension']['include'])){
                var _include = argumentsObj['extension']['include'].split(',');
                _.each(_include, function(e){
                    extensionObj[e] = true;
                });
            }
            if(!_.isUndefined(argumentsObj['extension']['exclude'])){
                var _exclude = argumentsObj['extension']['exclude'].split(',');
                _.each(_exclude, function(e){
                    extensionObj[e] = false;
                });
            }
            argumentsObj['extension'] = extensionObj;
        }
        if(!_.isUndefined(argumentsObj['name'])){
            var nameObj = {};
            if(!_.isUndefined(argumentsObj['name']['include'])){
                nameObj[argumentsObj['name']['include']] = true;
            }
            if(!_.isUndefined(argumentsObj['name']['exclude'])){
                nameObj[argumentsObj['name']['exclude']] = false;
            }
            argumentsObj['name'] = nameObj;
        }

        ensureDir();
    }
    function ensureDir(){
        var callbackFn = function(err){
            if(err){
                argumentsObj.callback(err);
            } else {
                listDir();
            }
        };

        fs.access(argumentsObj.basedir, fs.F_OK, callbackFn);
    }
    function listDir(){
        var callbackFn = function(err, files){
            if(err){
                argumentsObj.callback(err);
            } else {
                walkOverDirContent(files);
            }
        };

        fs.readdir(argumentsObj.basedir, callbackFn);
    }
    function walkOverDirContent(files){
        _.each(files, function(file){
            // TODO
        });
    }

    prepareArguments();
}