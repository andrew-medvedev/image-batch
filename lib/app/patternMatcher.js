/**
 * Created by ihatemicro$oft on 17.07.2016.
 */

'use strict';

module.exports = {
    match: match,
    getAllIndexesOfSubstring: getAllIndexesOfSubstring
};

var _ = require('underscore');

var ANY_ONE_TOKEN = '_',
    ANY_MANY_TOKEN = '%';

const PATTERN_TOKEN_TYPE_ANY_ONE = 1,
    PATTERN_TOKEN_TYPE_ANY_MANY = 2,
    PATTERN_TOKEN_TYPE_EXACT_CHARS = 3;

function match(subject, pattern, callback){
    var patternBuilt = [];

    function buildPattern(){
        var charsFlag = false,
            i, charsBuffer = '';
        for(i = 0 ; i < pattern.length ; i++){
            var patternChar = pattern[i];
            switch(patternChar){
                case ANY_ONE_TOKEN:
                    if(charsFlag){
                        charsFlag = false;
                        patternBuilt.push({ type: PATTERN_TOKEN_TYPE_EXACT_CHARS, chars: charsBuffer });
                        charsBuffer = '';
                    }
                    if(i > 0 && pattern[i - 1] === ANY_MANY_TOKEN){
                        if(callback){
                            return callback(new Error('Cannot use % token beside of any other wildcard token'), false);
                        } else {
                            return { err: new Error('Cannot use % token beside of any other wildcard token'), match: false };
                        }
                    } else {
                        patternBuilt.push({ type: PATTERN_TOKEN_TYPE_ANY_ONE });
                    }
                    break;
                case ANY_MANY_TOKEN:
                    if(charsFlag){
                        charsFlag = false;
                        patternBuilt.push({ type: PATTERN_TOKEN_TYPE_EXACT_CHARS, chars: charsBuffer });
                        charsBuffer = '';
                    }
                    if(i > 0 && pattern[i - 1] === ANY_MANY_TOKEN || pattern[i - 1] === ANY_ONE_TOKEN){
                        if(callback){
                            return callback(new Error('Cannot use % token beside of any other wildcard token'), false);
                        } else {
                            return { err: new Error('Cannot use % token beside of any other wildcard token'), match: false };
                        }
                    } else {
                        patternBuilt.push({ type: PATTERN_TOKEN_TYPE_ANY_MANY });
                    }
                    break;
                default:
                    charsFlag = true;
                    charsBuffer += patternChar;
            }
        }
        if(charsFlag){
            patternBuilt.push({ type: PATTERN_TOKEN_TYPE_EXACT_CHARS, chars: charsBuffer });
        }

        if(callback){
            callback(null, nextToken(0, 0));
        } else {
            return { err: null, match: nextToken(0, 0) };
        }
    }
    function nextToken(subjectIndex, patternIndex){
        var currentToken = patternBuilt[patternIndex++];
        if(!_.isUndefined(currentToken)){
            switch(currentToken.type){
                case PATTERN_TOKEN_TYPE_ANY_ONE:
                    return checkAnyOne(subjectIndex, patternIndex);
                case PATTERN_TOKEN_TYPE_ANY_MANY:
                    return checkAnyMany(subjectIndex, patternIndex);
                case PATTERN_TOKEN_TYPE_EXACT_CHARS:
                    return checkExactChars(subjectIndex, patternIndex, currentToken);
            }
        } else {
            return _.isUndefined(subject[subjectIndex]);
        }
    }
    function checkAnyOne(subjectIndex, patternIndex){
        var nextChar = subject[subjectIndex++];
        if(!_.isUndefined(nextChar)){
            return nextToken(subjectIndex, patternIndex);
        } else {
            return false;
        }
    }
    function checkAnyMany(subjectIndex, patternIndex){
        var theNextToken = patternBuilt[patternIndex++];
        if(!_.isUndefined(theNextToken)){
            var nextTokenIndexes = getAllIndexesOfSubstring(subject, subjectIndex + 1, theNextToken.chars);

            if(nextTokenIndexes.length === 0){
                return false;
            } else {
                for(var i = 0; i < nextTokenIndexes.length ; i++){
                    var branchResult = nextToken(nextTokenIndexes[i] + theNextToken.chars.length, patternIndex);
                    if(branchResult){
                        return true;
                    }
                }
                return false;
            }
        } else {
            return !_.isUndefined(subject[subjectIndex]);
        }
    }
    function checkExactChars(subjectIndex, patternIndex, currentToken){
        for(var j = 0 ; j < currentToken.chars.length ; j++){
            if(currentToken.chars[j] !== subject[subjectIndex++]){
                return false;
            }
        }

        return nextToken(subjectIndex, patternIndex);
    }

    return buildPattern();
}

function getAllIndexesOfSubstring(origin, originFrom, substring){
    var gotcha = 0;
    var out = [];

    for(var i = originFrom ; i < origin.length ; i++){
        if(origin[i] === substring[gotcha]){
            if(++gotcha === substring.length){
                out.push(i + 1 - gotcha);
                gotcha = 0;
            }
        } else {
            gotcha = 0;
            if(origin[i] === substring[gotcha]){
                i--;
            }
        }
    }

    return out;
}