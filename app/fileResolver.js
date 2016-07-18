/**
 * Created by ihatemicro$oft on 17.07.2016.
 */

'use strict';

module.exports = {
    list: list
};

var _ = require('underscore'),
    fs = require('fs'),
    path = require('path');

var patternMatcher = require('./patternMatcher.js');

function list(argumentsObj) {
    function prepareArguments(){
        if(!_.isUndefined(argumentsObj['extension'])){
            if(!_.isUndefined(argumentsObj['extension']['include'])){
                var _include = argumentsObj['extension']['include'].split(',');
                argumentsObj['extension']['include'] = {};
                _.each(_include, function(e){
                    argumentsObj['extension']['include'][e] = true;
                });
            } else if(!_.isUndefined(argumentsObj['extension']['exclude'])){
                var _exclude = argumentsObj['extension']['exclude'].split(',');
                argumentsObj['extension']['exclude'] = {};
                _.each(_exclude, function(e){
                    argumentsObj['extension']['exclude'][e] = true;
                });
            }
        }

        ensureDir();
    }
    function ensureDir(){
        var callbackFn = function(err){
            if(err){
                argumentsObj.callback(err, null);
            } else {
                listDir();
            }
        };

        fs.access(argumentsObj.basedir, fs.F_OK, callbackFn);
    }
    function listDir(){
        var callbackFn = function(err, files){
            if(err){
                argumentsObj.callback(err, null);
            } else {
                walkOverDirContent(files);
            }
        };

        fs.readdir(argumentsObj.basedir, callbackFn);
    }
    function walkOverDirContent(files){
        for(var i = files.length - 1 ; i >= 0 ; i--){
            var file = files[i],
                name = path.basename(file).replace(path.extname(file), ''),
                extension = path.extname(file).substr(1);

            if(!_.isUndefined(argumentsObj.extension)){
                if(!_.isUndefined(argumentsObj.extension.include)){
                    if(!argumentsObj.extension.include[extension]){
                        files.splice(i, 1);
                        continue;
                    }
                } else if(!_.isUndefined(argumentsObj.extension.exclude)){
                    if(argumentsObj.extension.exclude[extension]){
                        files.splice(i, 1);
                        continue;
                    }
                }
            }

            if(!_.isUndefined(argumentsObj.name)){
                if(!_.isUndefined(argumentsObj.name.include)){
                    var matchResult = patternMatcher.match(name, argumentsObj.name.include);
                    if(matchResult.err){
                        return argumentsObj.callback(matchResult.err, null);
                    } else if(!matchResult.match){
                        files.splice(i, 1);
                    }
                } else if(!_.isUndefined(argumentsObj.name.exclude)){
                    matchResult = patternMatcher.match(name, argumentsObj.name.exclude);
                    if(matchResult.err){
                        return argumentsObj.callback(matchResult.err, null);
                    } else if(matchResult.match){
                        files.splice(i, 1);
                    }
                }
            }
        }

        argumentsObj.callback(null, files);
    }

    prepareArguments();
}