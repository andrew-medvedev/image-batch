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
    _ = require('underscore');

var RESIZE_ARG = '--resize',
    RESIZE_ARG_SHORT = '-R',
    NAME_ARG = '--name',
    NAME_ARG_SHORT = '-N',
    NO_NAME_ARG = '--no-name',
    NO_NAME_ARG_SHORT = '-NN',
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

var ARG_TYPOS = {
    '-resize': 'Did you mean \'--resize\'? May be you have a typo',
    '--R': 'Did you mean \'-R\'? May be you have a typo',
    '-name': 'Did you mean \'--name\'? May be you have a typo',
    '--N': 'Did you mean \'-N\'? May be you have a typo',
    '-no-name': 'Did you mean \'--no-name\'? May be you have a typo',
    '--NN': 'Did you mean \'-NN\'? May be you have a typo',
    '-only-format': 'Did you mean \'--only-format\'? May be you have a typo',
    '--OF': 'Did you mean \'-OF\'? May be you have a typo',
    '-without-format': 'Did you mean \'--without-format\'? May be you have a typo',
    '--WOF': 'Did you mean \'-WOF\'? May be you have a typo',
    '-postfix': 'Did you mean \'--postfix\'? May be you have a typo',
    '--P': 'Did you mean \'-P\'? May be you have a typo',
    '-formats': 'Did you mean \'--formats\'? May be you have a typo',
    '--F': 'Did you mean \'-F\'? May be you have a typo',
    '-save-as': 'Did you mean \'--save-as\'? May be you have a typo',
    '--S': 'Did you mean \'-S\'? May be you have a typo',
    '-remove-original': 'Did you mean \'--remove-original\'? May be you have a typo',
    '--REMOVE': 'Did you mean \'-REMOVE\'? May be you have a typo',
    '-help': 'Did you mean \'--help\'? May be you have a typo',
    '--H': 'Did you mean \'-H\'? May be you have a typo',
    '-directory': 'Did you mean \'--directory\'? May be you have a typo',
    '--D': 'Did you mean \'-D\'? May be you have a typo',
    '-version': 'Did you mean \'--version\'? May be you have a typo',
    '--V': 'Did you mean \'-V\'? May be you have a typo'
};

function doJobWithArguments(args, callback){
    var argBook = { },
        directiveObject;

    for(var i = 2 ; i < args.length ; i++){
        if(!_.isUndefined(ARG_TYPOS[args[i]])){
            console.log(ARG_TYPOS[args[i]]);
            return callback(null);
        }

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
                    argBook.includeFilenames = args[i];
                }
                break;
            case NO_NAME_ARG:
            case NO_NAME_ARG_SHORT:
                if(++i < args.length){
                    argBook.excludeFilenames = args[i];
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
        var thisPackage = require('./../package.json');
        console.log(thisPackage.name + ' version: ' + thisPackage.version);
        return callback(null);
    } else if(argBook.help){
        printHelp();
        return callback(null);
    }

    if(argBook.directory){
        directiveObject = app.directive(argBook.directory);
    } else {
        directiveObject = app.directive(path.dirname(args[1]));
    }

    if(!argBook.resize){
        log.info('No resize query');
        return callback(new Error('No resize query'))
    } else {
        directiveObject.resize(argBook.resize);
    }
    if(argBook.includeFilenames){
        directiveObject.includeFilename(argBook.includeFilenames.split(','));
    }
    if(argBook.excludeFilenames){
        directiveObject.excludeFilename(argBook.excludeFilenames.split(','));
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
            callback(err);
        } else {
            log.info('DONE');
            callback(null);
        }
    };

    directiveObject.asCallback(callbackFn);
}

doJobWithArguments(process.argv, _.noop);

function printHelp(){
    console.log('Usage: image-batch [options]');
    console.log('\nOptions:');
    console.log(' ' + VERSION_ARG_SHORT + ', ' + VERSION_ARG + '\t\tPrints version');
    console.log(' ' + HELP_ARG_SHORT + ', ' + HELP_ARG + '\t\tPrints this message\n');
    console.log(' ' + RESIZE_ARG_SHORT + ', ' + RESIZE_ARG + '\t\tSet resize query');
    console.log(' ' + DIRECTORY_ARG_SHORT + ', ' + DIRECTORY_ARG + '\t\tSet base directory where images are');
    console.log(' ' + NAME_ARG_SHORT + ', ' + NAME_ARG + '\t\tFilename search pattern. Can be listed with comma');
    console.log(' ' + NO_NAME_ARG_SHORT + ', ' + NO_NAME_ARG + '\t\tFilename excluding pattern. Can be listed with comma');
    console.log(' ' + ONLY_FORMAT_ARG_SHORT + ', ' + ONLY_FORMAT_ARG + '\t\tSet exclusive image format to process');
    console.log(' ' + WITHOUT_FORMAT_ARG_SHORT + ', ' + WITHOUT_FORMAT_ARG + '\t\tSet image format that will be not processed');
    console.log(' ' + POSTFIX_ARG_SHORT + ', ' + POSTFIX_ARG + '\t\tSet name postfix for output files');
    console.log(' ' + FORMATS_ARG_SHORT + ', ' + FORMATS_ARG + '\t\tSet exclusive list of formats separated by commas');
    console.log(' ' + SAVE_AS_ARG_SHORT + ', ' + SAVE_AS_ARG + '\t\tSet format for output files');
    console.log(' ' + REMOVE_ORIGINAL_ARG_SHORT + ', ' + REMOVE_ORIGINAL_ARG + '\t\tSet remove original files flag');
    console.log('\nMore info here: https://github.com/andrew-medvedev/image-batch')
}