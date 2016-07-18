/**
 * Created by ihatemicro$oft on 19.07.2016.
 */

'use strict';

module.exports = getBuilder;

function DirectoryBuilder(basedir){
    this.onlyFormat = function(format){

    };
    this.withoutFormat = function(format){

    };
    this.resizePercent = function(percent){

    };
    this.resizeWidth = function(width){
        
    };
    this.withPostfix = function(postfix){

    };
    this.formats = function(){

    };
    this.resize = function(resizeQuery){

    };
    this.ignoreDirs = function(){
        
    };
    this.includeFilename = function(filenameQuery){
        
    };
    this.removeOriginal = function(){
        
    };
    this.getDirectiveObject = function(){

    };

    return this;
}

function getBuilder(basedir){
    return new DirectoryBuilder(basedir);
}