/**
 * Created by lol on 02.07.2016.
 */

'use strict';

module.exports = {
    directive: buildDirective
};

var jimp = require('jimp'),
    _ = require('underscore');

var directiveBuilder = require('./directiveBuilder.js'),
    fileResolver = require('./fileResolver.js');

function buildDirective(basedir){

    return directiveBuilder(basedir, runDirective);
}
function runDirective(directive, callback){
    function resolveFiles(){
        var callbackFn = function(err, files){
            if(err){
                callback(err);
            } else {
                resizeImagesDefineJobs(files);
            }
        };

        fileResolver.list({
            basedir: directive.basedir,
            name: directive.name,
            extension: directive.extension,
            callback: callbackFn
        });
    }
    function resizeImagesDefineJobs(files){
        var asyncJobs = [];

        _.each(files, function(imageFile){
            asyncJobs.push(function(cb){
                var whenRead = function(err, img){
                    if(err){
                        cb(err);
                    } else {
                        
                    }
                };

                jimp.read(imageFile, whenRead);
            });
        });
    }

    resolveFiles();
}