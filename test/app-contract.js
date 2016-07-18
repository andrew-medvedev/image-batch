/**
 * Created by lol on 02.07.2016.
 */

'use strict';

var async = require('async'),
    fs = require('fs-extra');

var app = require('../app/app.js');

describe('Pattern matcher contract', function(){
    require('./patternMatcher-contract.js');
});
describe('File resolver contract', function(){
    require('./fileResolver-contract.js');
});
describe.skip('Directive builder contract', function(){
    require('./directiveBuilder-contract.js');
});
describe.skip('Filename resolver contract', function(){
    require('./filenameResolver-contract.js');
});
describe.skip('Doing job', function(){
    it('Should do job with jpg\'s don\'t touch originals', function(done){
        var callbackFn = function(err){
            expect(err).to.be.a('null');

            done();
        };

        async.series([
            function(callbackFn){
                app.directive('./resources/job')
                    .onlyFormat('jpg')
                    .resize('50%')
                    .asCallback(callbackFn);
            },
            function(callbackFn){
                fs.ensureFile('./resources/job/bbb/bbb-1.jpg', callbackFn);
            }
        ], callbackFn);
    });
    it('Should do job with jpg\'s and png\'s', function(done){
        var callbackFn = function(err){
            expect(err).to.be.a('null');

            done();
        };

        async.series([
            function(callbackFn){
                app.directive('./resources/job')
                    .formats('jpg', 'png')
                    .resize('50%')
                    .asCallback(callbackFn);
            },
            function(callbackFn){
                fs.ensureFile('./resources/job/bbb/bbb-2.jpg', callbackFn);
            },
            function(callbackFn){
                fs.ensureFile('./resources/job/aaa/ccc-1.png', callbackFn);
            }
        ], callbackFn);
    });
});