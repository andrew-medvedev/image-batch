/**
 * Created by lol on 02.07.2016.
 */

'use strict';

var expect = require('chai').expect;

var filenameResolver = require('../lib/app/filenameResolver.js');

describe('Resolving filename conflicts', function(){
    it('Should get filename for "aaa.jpg" file', function(done){
        var callbackFn = function(err, filename){
            expect(err).to.be.a('null');
            expect(filename).to.not.be.a('null');
            expect(filename).to.not.be.a('undefined');
            expect(filename).to.be.equal('aaa-1.jpg');

            done();
        };

        filenameResolver('./test/resources/same_names/', 'aaa.jpg', callbackFn);
    });
    it('Should get filename for "aaa.png" file', function(done){
        var callbackFn = function(err, filename){
            expect(err).to.be.a('null');
            expect(filename).to.not.be.a('null');
            expect(filename).to.not.be.a('undefined');
            expect(filename).to.be.equal('aaa.png');

            done();
        };

        filenameResolver('./test/resources/same_names/', 'aaa.png', callbackFn);
    });
    it('Should get filename for "bbb.jpg" file', function(done){
        var callbackFn = function(err, filename){
            expect(err).to.be.a('null');
            expect(filename).to.not.be.a('null');
            expect(filename).to.not.be.a('undefined');
            expect(filename).to.be.equal('bbb-2.jpg');

            done();
        };

        filenameResolver('./test/resources/same_names/', 'bbb.jpg', callbackFn);
    });
    it('Should get filename for "ccc.jpg" file', function(done){
        var callbackFn = function(err, filename){
            expect(err).to.be.a('null');
            expect(filename).to.not.be.a('null');
            expect(filename).to.not.be.a('undefined');
            expect(filename).to.be.equal('ccc-4.jpg');

            done();
        };

        filenameResolver('./test/resources/same_names/', 'ccc.jpg', callbackFn);
    });
    it('Should get filename for "ddd.jpg" file', function(done){
        var callbackFn = function(err, filename){
            expect(err).to.be.a('null');
            expect(filename).to.not.be.a('null');
            expect(filename).to.not.be.a('undefined');
            expect(filename).to.be.equal('ddd.jpg');

            done();
        };

        filenameResolver('./test/resources/same_names/', 'ddd.jpg', callbackFn);
    });
});