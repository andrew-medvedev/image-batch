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
    commander = require('commander');

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
    REMOVE_ORIGINAL_ARG_SHORT = '-REMOVE',
    HELP_ARG = '--help',
    HELP_ARG_SHORT = '-H',
    DIRECTORY_ARG = '--directory',
    DIRECTORY_ARG_SHORT = '-D',
    VERSION_ARG = '--version',
    VERSION_ARG_SHORT = '-V';

function doJobWithArguments(args){
    var argBook = { },
        directiveObject;

    for(var i = 2 ; i < args.length ; i++){
        switch(args[i]){
            case RESIZE_ARG:
            case RESIZE_ARG_SHORT:
                if(++i < args.length){
                    argBook.resize = args[i];
                }
                break;
            case NAME_ARG:
            case NAME_ARG_SHORT:
                if(++i < args.length){
                    argBook.includeFilename = args[i];
                }
                break;
            case ONLY_FORMAT_ARG:
            case ONLY_FORMAT_ARG_SHORT:
                if(++i < args.length){
                    argBook.onlyFormat = args[i];
                }
                break;
            case WITHOUT_FORMAT_ARG:
            case WITHOUT_FORMAT_ARG_SHORT:
                if(++i < args.length){
                    argBook.withoutFormat = args[i];
                }
                break;
            case POSTFIX_ARG:
            case POSTFIX_ARG_SHORT:
                if(++i < args.length){
                    argBook.withPostfix = args[i];
                }
                break;
            case FORMATS_ARG:
            case FORMATS_ARG_SHORT:
                if(++i < args.length){
                    argBook.formats = args[i].split(',');
                }
                break;
            case SAVE_AS_ARG:
            case SAVE_AS_ARG_SHORT:
                if(++i < args.length){
                    argBook.saveAs = args[i];
                }
                break;
            case REMOVE_ORIGINAL_ARG:
            case REMOVE_ORIGINAL_ARG_SHORT:
                argBook.removeOriginal = true;
                break;
            case DIRECTORY_ARG:
            case DIRECTORY_ARG_SHORT:
                if(++i < args.length){
                    argBook.directory = args[i];
                }
                break;
            case HELP_ARG:
            case HELP_ARG_SHORT:
                argBook.help = true;
                break;
            case VERSION_ARG:
            case VERSION_ARG_SHORT:
                argBook.version = true;
                break;
        }
    }
    if(argBook.version){
        return console.log('image-sausage version: ' + require('./package.json').version);
    } else if(argBook.help){
        return printHelp();
    }

    if(argBook.directory){
        directiveObject = app.directive(argBook.directory);
    } else {
        directiveObject = app.directive(path.dirname(arguments[1]));
    }

    if(!argBook.resize){
        return log.info('No resize query');
    } else {
        directiveObject.resize(argBook.resize);
    }
    if(argBook.includeFilename){
        directiveObject.includeFilename(argBook.includeFilename);
    }
    if(argBook.onlyFormat){
        directiveObject.onlyFormat(argBook.onlyFormat);
    }
    if(argBook.withoutFormat){
        directiveObject.withoutFormat(argBook.withoutFormat);
    }
    if(argBook.withPostfix){
        directiveObject.withPostfix(argBook.withPostfix);
    }
    if(argBook.formats){
        directiveObject.formats(argBook.formats);
    }
    if(argBook.saveAs){
        directiveObject.saveAs(argBook.saveAs);
    }
    if(argBook.removeOriginal){
        directiveObject.removeOriginal();
    }

    log.info('Processing..');

    var callbackFn = function(err){
        if(err){
            if(err.message === 'No resize query'){
                log.info(err.message);
            } else {
                log.error(err);
            }
        } else {
            log.info('DONE');
        }
    };

    directiveObject.asCallback(callbackFn);
}

doJobWithArguments(process.argv);

function printHelp(){
    console.log('Usage: image-sausage [options]');
    console.log('\nOptions:');
    console.log(' ' + VERSION_ARG_SHORT + ', ' + VERSION_ARG + '\t\tPrints image-sausage\'s version');
    console.log(' ' + RESIZE_ARG_SHORT + ', ' + RESIZE_ARG + '\t\tSet resize query');
    console.log('\nOptional arguments:');
    console.log(' ' + DIRECTORY_ARG_SHORT + ', ' + DIRECTORY_ARG + '\t\tSet base directory where images are');
    console.log(' ' + NAME_ARG_SHORT + ', ' + NAME_ARG + '\t\tFilename search pattern');
    console.log(' ' + ONLY_FORMAT_ARG_SHORT + ', ' + ONLY_FORMAT_ARG + '\t\tSet exclusive image format to process');
    console.log(' ' + WITHOUT_FORMAT_ARG_SHORT + ', ' + WITHOUT_FORMAT_ARG + '\t\tSet image format that will be not processed');
    console.log(' ' + POSTFIX_ARG_SHORT + ', ' + POSTFIX_ARG + '\t\tSet name postfix for output files');
    console.log(' ' + FORMATS_ARG_SHORT + ', ' + FORMATS_ARG + '\t\tSet exclusive list of formats separated by commas');
    console.log(' ' + SAVE_AS_ARG_SHORT + ', ' + SAVE_AS_ARG + '\t\tSet format for output files');
    console.log(' ' + REMOVE_ORIGINAL_ARG_SHORT + ', ' + REMOVE_ORIGINAL_ARG + '\t\tSet remove original files flag');
}