/**
 * Created by ihatemicro$oft on 19.07.2016.
 */

'use strict';

module.exports = getBuilder;

var STANDARD_POSTFIX_DELIMITER = '-',
    DEFAULT_IMAGE_FORMATS = ['bmp', 'png', 'gif', 'jpg', 'jpeg'];

var _ = require('underscore');

function DirectoryBuilder(basedir, executorFn){
    var THAT = this,
        directiveObject = {
            basedir: basedir,
            removeOriginal: false,
            postfix: '',
            postfixDelimiter: STANDARD_POSTFIX_DELIMITER,
            extension: { include: DEFAULT_IMAGE_FORMATS }
        };

    this.onlyFormat = function(format){
        directiveObject.extension = _.extend(directiveObject.extension, { include: format });

        return THAT;
    };
    this.withoutFormat = function(format){
        directiveObject.extension.include = _.filter(directiveObject.extension.include, function(e){
            return e !== format;
        });

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
        directiveObject.extension = _.extend(directiveObject.extension, { include: formats });

        return THAT;
    };
    this.resize = function(resizeQuery){
        directiveObject.resize = resizeQuery;

        return THAT;
    };
    this.saveAs = function(saveAsFormat){
        directiveObject.saveAsFormat = saveAsFormat;

        return THAT;
    };
    this.includeFilename = function(filenameQuery){
        if(_.isArray(filenameQuery) && filenameQuery.length === 1){
            filenameQuery = filenameQuery[0];
        }
        if(!_.isUndefined(directiveObject.name)){
            directiveObject.name.include = filenameQuery;
        } else {
            directiveObject.name = { include: filenameQuery };
        }

        return THAT;
    };
    this.excludeFilename = function(filenameQuery){
        if(_.isArray(filenameQuery) && filenameQuery.length === 1){
            filenameQuery = filenameQuery[0];
        }
        if(!_.isUndefined(directiveObject.name)){
            directiveObject.name.exclude = filenameQuery;
        } else {
            directiveObject.name = { exclude: filenameQuery };
        }

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

function getBuilder(basedir, executorFn){
    return new DirectoryBuilder(basedir, executorFn);
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