/**
 * Created by ihatemicro$oft on 19.07.2016.
 */

'use strict';

module.exports = getBuilder;

var STANDARD_POSTFIX_DELIMITER = '-';

var _ = require('underscore');

function DirectoryBuilder(basedir, executorFn){
    var THAT = this,
        directiveObject = {
            basedir: basedir,
            removeOriginal: false,
            postfix: '',
            postfixDelimiter: STANDARD_POSTFIX_DELIMITER
        };

    this.onlyFormat = function(format){
        directiveObject.extension = { include: format };

        return THAT;
    };
    this.withoutFormat = function(format){
        directiveObject.extension = { exclude: format };

        return THAT;
    };
    this.resizePercent = function(percent){
        directiveObject.resize = percent + '%';

        return THAT;
    };
    this.resizeWidth = function(width){
        directiveObject.resize = 'w' + width;

        return THAT;
    };
    this.withPostfix = function(postfix){
        directiveObject.postfix = postfix;

        return THAT;
    };
    this.formats = function(){
        var formats = getFlatArray(arguments);
        if(formats.length === 1){
            directiveObject.extension = { include: formats[0] };
        } else if(formats.length > 1){
            directiveObject.extension = { include: formats };
        } else {
            delete directiveObject.extension;
        }

        return THAT;
    };
    this.resize = function(resizeQuery){
        directiveObject.resize = resizeQuery;

        return THAT;
    };
    this.ignoreDirs = function(){
        directiveObject.ignoreDirs = getFlatArray(arguments);

        return THAT;
    };
    this.includeFilename = function(filenameQuery){
        if(_.isArray(filenameQuery) && filenameQuery.length > 0){
            filenameQuery = filenameQuery[0];
        }
        directiveObject.name = { include: filenameQuery };

        return THAT;
    };
    this.removeOriginal = function(){
        directiveObject.removeOriginal = true;

        return THAT;
    };
    this.getDirectiveObject = function(){
        return directiveObject;
    };
    this.asCallback = function(callbackFn){
        executorFn(THAT.getDirectiveObject(), callbackFn);
    };

    return this;
}

function getBuilder(basedir){
    return new DirectoryBuilder(basedir);
}

function getFlatArray(sourceArray){
    var out = [];

    for(var i = 0; i < sourceArray.length ; i++){
        if(_.isArray(sourceArray[i])){
            out = out.concat(getFlatArray(sourceArray[i]));
        } else {
            out.push(sourceArray[i]);
        }
    }

    return out;
}