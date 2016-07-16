/**
 * Created by ihatemicro$oft on 17.07.2016.
 */

'use strict';

module.exports = {
    match: match
};

var _ = require('underscore');

const ANY_ONE_TOKEN = '_',
    ANY_MANY_TOKEN = '%';

const PATTERN_TOKEN_TYPE_ANY_ONE = 1,
    PATTERN_TOKEN_TYPE_ANY_MANY = 2,
    PATTERN_TOKEN_TYPE_EXACT_CHARS = 3;

function match(subject, pattern, callback){
    var patternBuilt = [],
        i, itoken = 0;

    function buildPattern(){
        var charsFlag = false,
            charsBuffer = '';
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
                        return callback(new Error('Cannot use % token beside of any other wildcard token'), false);
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
                        return callback(new Error('Cannot use % token beside of any other wildcard token'), false);
                    } else {
                        patternBuilt.push({ type: PATTERN_TOKEN_TYPE_ANY_MANY });
                    }
                    break;
                default:
                    charsFlag = true;
                    charsBuffer += patternChar;
            }
        }

        i = 0;
        nextToken();
    }
    function nextToken(){
        var currentToken = patternBuilt[itoken++];
        if(currentToken){
            switch(currentToken.type){
                case PATTERN_TOKEN_TYPE_ANY_ONE:
                    checkAnyOne();
                    break;
                case PATTERN_TOKEN_TYPE_ANY_MANY:
                    checkAnyMany();
                    break;
                case PATTERN_TOKEN_TYPE_EXACT_CHARS:
                    checkExactChars(currentToken);
                    break;
            }
        } else if(subject[i] === null){
            callback(null, true);
        } else {
            callback(new Error('WTF?'), false);
        }
    }
    function checkAnyOne(){
        var nextChar = subject[i++];
        if(nextChar){
            nextToken();
        } else {
            callback(null, false);
        }
    }
    function checkAnyMany(){
        var charsToken = patternBuilt[itoken++];
        if(charsToken){
            var nextTokenMatchScore = 0,
                nextChar, currentTokenPass = false;
            while(true){
                nextChar = subject[i++];
                if(nextChar){
                    if(charsToken.chars[nextTokenMatchScore] === nextChar){
                        if(++nextTokenMatchScore === charsToken.chars.length){
                            if(!currentTokenPass){
                                return callback(null, false);
                            } else {
                                return nextToken();
                            }
                        }
                    }
                } else {
                    return callback(null, false);
                }
            }
        } else {
            callback(null, !_.isUndefined(subject[i]));
        }
    }
    function checkExactChars(currentToken){
        for(var j = 0 ; j < currentToken.chars.length ; j++){
            if(currentToken.chars[j] !== subject[i++]){
                return callback(null, false);
            }
        }

        nextToken();
    }

    buildPattern();
}