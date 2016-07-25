/**
 * Created by lol on 02.07.2016.
 */

'use strict';

module.exports = {
    doJobWithArguments: doJobWithArguments
};

var path = require('path'),
    log = require('winston'),
    app = require('./app/app.js'),
    Spinner = require('cli-spinner').Spinner;

var RESIZE_ARG = '--resize',
    RESIZE_ARG_SHORT = '-R',
    NAME_ARG = '--name',
    NAME_ARG_SHORT = '-N',
    ONLY_FORMAT_ARG = '--only-format',
    ONLY_FORMAT_ARG_SHORT = '-OF',
    WITHOUT_FORMAT_ARG = '--without-format',
    WITHOUT_FORMAT_ARG_SHORT = '-WOF',
    POSTFIX_ARG = '--postfix',
    POSTFIX_ARG_SHORT = '-P',
    FORMATS_ARG = '--formats',
    FORMATS_ARG_SHORT = '-F',
    SAVE_AS_ARG = '--save-as',
    SAVE_AS_ARG_SHORT = '-S',
    REMOVE_ORIGINAL_ARG = '--remove-original',
    REMOVE_ORIGINAL_ARG_SHORT = '-REMOVE';

function doJobWithArguments(){
    var directiveObject = app.directive(path.dirname(arguments[1]));

    for(var i = 2 ; i < arguments.length ; i++){
        switch(arguments[i]){
            case RESIZE_ARG:
            case RESIZE_ARG_SHORT:
                if(++i < arguments.length){
                    directiveObject.resize(arguments[i]);
                }
                break;
            case NAME_ARG:
            case NAME_ARG_SHORT:
                if(++i < arguments.length){
                    directiveObject.includeFilename(arguments[i]);
                }
                break;
            case ONLY_FORMAT_ARG:
            case ONLY_FORMAT_ARG_SHORT:
                if(++i < arguments.length){
                    directiveObject.onlyFormat(arguments[i]);
                }
                break;
            case WITHOUT_FORMAT_ARG:
            case WITHOUT_FORMAT_ARG_SHORT:
                if(++i < arguments.length){
                    directiveObject.withoutFormat(arguments[i]);
                }
                break;
            case POSTFIX_ARG:
            case POSTFIX_ARG_SHORT:
                if(++i < arguments.length){
                    directiveObject.withoutFormat(arguments[i]);
                }
                break;
            case FORMATS_ARG:
            case FORMATS_ARG_SHORT:
                if(++i < arguments.length){
                    directiveObject.formats(arguments[i].split(','));
                }
                break;
            case SAVE_AS_ARG:
            case SAVE_AS_ARG_SHORT:
                if(++i < arguments.length){
                    directiveObject.saveAs(arguments[i]);
                }
                break;
            case REMOVE_ORIGINAL_ARG:
            case REMOVE_ORIGINAL_ARG_SHORT:
                directiveObject.removeOriginal();
                break;
        }
    }

    var spinner = new Spinner('Processing.. %s');
    spinner.setSpinnerString('|/-\\');
    spinner.start();

    var callbackFn = function(err){
        spinner.stop();
        if(err){
            log.error(err);
        } else {
            log.info('DONE');
        }
    };

    directiveObject.asCallback(callbackFn);
}

doJobWithArguments(process.argv);