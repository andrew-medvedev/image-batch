/**
 * Created by lol on 02.07.2016.
 */

'use strict';

module.exports = {
    directive: buildDirective
};

var jimp = require('jimp'),
    _ = require('underscore'),
    async = require('async'),
    path = require('path'),
    fs = require('fs-extra');

var directiveBuilder = require('./directiveBuilder.js'),
    fileResolver = require('./fileResolver.js'),
    filenameResolver = require('./filenameResolver.js');

function buildDirective(basedir){

    return directiveBuilder(basedir, runDirective);
}
function runDirective(directive, callback){
    function resolveFiles(){
        var callbackFn = function(err, files){
            if(err){
                callback(err);
            } else {
                resizeImages(files);
            }
        };

        fileResolver.list({
            basedir: directive.basedir,
            name: directive.name,
            extension: directive.extension,
            callback: callbackFn
        });
    }
    function resizeImages(files){
        var waterfall = [];
        for(var i = 0 ; i < files.length ; i++){
            (function(file){
                waterfall.push(function(cb){
                    jimp.read(file, cb);
                });
                waterfall.push(function(imageObject, cb){
                    try{
                        resizeImage(imageObject, directive.resize);
                    } catch(err){
                        return cb(err, null);
                    }
                    cb(null, imageObject);
                });
                waterfall.push(function(imageObject, cb){
                    resolveNewName(file, imageObject, cb);
                });
                waterfall.push(function(newImagePath, imageObject, cb){
                    imageObject.write(newImagePath, cb);
                });
                waterfall.push(function(jimpImg, cb){
                    if(directive.removeOriginal){
                        fs.remove(file, cb);
                    } else {
                        cb(null);
                    }
                });
            })(path.join(path.resolve(directive.basedir), files[i]));
        }

        async.waterfall(waterfall, callback);
    }
    function resizeImage(imageObject, resizeQuery){
        resizeQuery = resizeQuery.toLowerCase();

        if(resizeQuery.indexOf('%') >= 0){
            var percentage = parseInt(resizeQuery.replace('%', ''));
            if(_.isNaN(percentage) || percentage < 0 || percentage > 100){
                throw new Error('Invalid resize query');
            } else {
                imageObject.scale(percentage / 100);
            }
        } else if(resizeQuery.indexOf('w') >= 0){
            var width = parseInt(resizeQuery.replace('w', ''));
            if(_.isNaN(width) || width < 0){
                throw new Error('Invalid resize query');
            } else {
                imageObject.resize(width, jimp.AUTO);
            }
        } else if(resizeQuery.indexOf('h') >= 0){
            var height = parseInt(resizeQuery.replace('h', ''));
            if(_.isNaN(height) || height < 0){
                throw new Error('Invalid resize query');
            } else {
                imageObject.resize(jimp.AUTO, height);
            }
        } else if(resizeQuery.indexOf('x') >= 0){
            var wh = resizeQuery.split('x');
            width = parseInt(wh[0]);
            height = parseInt(wh[1]);
            if(_.isNaN(width) || _.isNaN(height) || width < 0 || height < 0){
                throw new Error('Invalid resize query');
            } else {
                imageObject.resize(width, height);
            }
        } else {
            throw new Error('Invalid resize query');
        }
    }
    function resolveNewName(filepath, fileObj, callback){
        var fileName = path.basename(filepath);

        var callbackFn = function(err, filename){
            filename = path.join(path.dirname(filepath), filename);
            callback(err, filename, fileObj);
        };

        filenameResolver(directive.basedir, fileName, callbackFn);
    }

    resolveFiles();
}