/**
 * Created by lol on 02.07.2016.
 */

'use strict';

var expect = require('chai').expect,
    async = require('async'),
    fs = require('fs-extra'),
    jimp = require('jimp');

var app = require('../lib/app/app.js');

describe('Pattern matcher contract', function(){
    require('./patternMatcher-contract.js');
});
describe('File resolver contract', function(){
    require('./fileResolver-contract.js');
});
describe('Directive builder contract', function(){
    require('./directiveBuilder-contract.js');
});
describe('Filename resolver contract', function(){
    require('./filenameResolver-contract.js');
});
describe('Doing job', function(){
    it('Should do job with jpg\'s don\'t touch originals', function(done){
        var callbackFn = function(err){
            expect(err).to.be.a('null');

            done();
        };

        async.series([
            function(callbackFn){
                app.directive('./test/resources/job')
                    .onlyFormat('jpg')
                    .resize('50%')
                    .asCallback(callbackFn);
            },
            function(callbackFn){
                fs.ensureFile('./test/resources/job/bbb-1.jpg', callbackFn);
            }
        ], callbackFn);
    });
    it('bbb-1.jpg should have half size of bbb.jpg', function(done){
        var callbackFn = function(err, bbbW, bbbH, bbb1W, bbb1H){
            expect(err).to.be.a('null');
            expect(bbb1W).to.be.equal(Math.round(bbbW / 2));
            expect(bbb1H).to.be.equal(Math.round(bbbH / 2));

            done();
        };

        async.waterfall([
            function(cb){
                jimp.read('./test/resources/job/bbb.jpg', cb);
            },
            function(image, cb){
                var _cb = function(err, image1){
                    cb(
                        err,
                        image.bitmap.width,
                        image.bitmap.height,
                        image1.bitmap.width,
                        image1.bitmap.height
                    );
                };

                jimp.read('./test/resources/job/bbb-1.jpg', _cb);
            }
        ], callbackFn);
    });
    it('Should delete file bbb-1.jpg', function(done){
        var callbackFn = function(err){
            expect(err).to.be.a('null');

            done();
        };

        fs.remove('./test/resources/job/bbb-1.jpg', callbackFn);
    });
    it('Should do job with jpg\'s and png\'s', function(done){
        var callbackFn = function(err){
            expect(err).to.be.a('null');

            done();
        };

        async.series([
            function(callbackFn){
                app.directive('./test/resources/job')
                    .formats('jpg', 'png')
                    .resize('50%')
                    .asCallback(callbackFn);
            },
            function(callbackFn){
                fs.ensureFile('./test/resources/job/bbb-1.jpg', callbackFn);
            },
            function(callbackFn){
                fs.ensureFile('./test/resources/job/ccc-1.png', callbackFn);
            }
        ], callbackFn);
    });
    it('bbb-1.jpg should have half size of bbb.jpg', function(done){
        var callbackFn = function(err, bbbW, bbbH, bbb1W, bbb1H){
            expect(err).to.be.a('null');
            expect(bbb1W).to.be.equal(Math.round(bbbW / 2));
            expect(bbb1H).to.be.equal(Math.round(bbbH / 2));

            done();
        };

        async.waterfall([
            function(cb){
                jimp.read('./test/resources/job/bbb.jpg', cb);
            },
            function(image, cb){
                var _cb = function(err, image1){
                    cb(
                        err,
                        image.bitmap.width,
                        image.bitmap.height,
                        image1.bitmap.width,
                        image1.bitmap.height
                    );
                };

                jimp.read('./test/resources/job/bbb-1.jpg', _cb);
            }
        ], callbackFn);
    });
    it('ccc-1.png should have half size of ccc.png', function(done){
        var callbackFn = function(err, cccW, cccH, ccc1W, ccc1H){
            expect(err).to.be.a('null');
            expect(ccc1W).to.be.equal(Math.round(cccW / 2));
            expect(ccc1H).to.be.equal(Math.round(cccH / 2));

            done();
        };

        async.waterfall([
            function(cb){
                jimp.read('./test/resources/job/ccc.png', cb);
            },
            function(image, cb){
                var _cb = function(err, image1){
                    cb(
                        err,
                        image.bitmap.width,
                        image.bitmap.height,
                        image1.bitmap.width,
                        image1.bitmap.height
                    );
                };

                jimp.read('./test/resources/job/ccc-1.png', _cb);
            }
        ], callbackFn);
    });
    it('Should delete file bbb-1.jpg', function(done){
        var callbackFn = function(err){
            expect(err).to.be.a('null');

            done();
        };

        fs.remove('./test/resources/job/bbb-1.jpg', callbackFn);
    });
    it('Should delete file ccc-1.png', function(done){
        var callbackFn = function(err){
            expect(err).to.be.a('null');

            done();
        };

        fs.remove('./test/resources/job/ccc-1.png', callbackFn);
    });
    it('Should do job with jpg\'s and png\'s and save as png', function(done){
        var callbackFn = function(err){
            expect(err).to.be.a('null');

            done();
        };

        app.directive('./test/resources/job')
            .formats('jpg', 'png')
            .saveAs('png')
            .resize('w500')
            .asCallback(callbackFn);
    });
    it('bbb.png should have width of 500', function(done){
        var callbackFn = function(err, image){
            expect(err).to.be.a('null');
            expect(image.bitmap.width).to.be.equal(500);

            done();
        };

        jimp.read('./test/resources/job/bbb.png', callbackFn);
    });
    it('ccc-1.png should have width of 500', function(done){
        var callbackFn = function(err, image){
            expect(err).to.be.a('null');
            expect(image.bitmap.width).to.be.equal(500);

            done();
        };

        jimp.read('./test/resources/job/ccc-1.png', callbackFn);
    });
    it('Should delete file bbb.png', function(done){
        var callbackFn = function(err){
            expect(err).to.be.a('null');

            done();
        };

        fs.remove('./test/resources/job/bbb.png', callbackFn);
    });
    it('Should delete file ccc-1.png', function(done){
        var callbackFn = function(err){
            expect(err).to.be.a('null');

            done();
        };

        fs.remove('./test/resources/job/ccc-1.png', callbackFn);
    });
    it('Should do job with jpg\'s and png\'s and save as png with postfix \'postf\'', function(done){
        var callbackFn = function(err){
            expect(err).to.be.a('null');

            done();
        };

        app.directive('./test/resources/job')
            .formats('jpg', 'png')
            .saveAs('png')
            .resize('250x250')
            .withPostfix('postf')
            .asCallback(callbackFn);
    });
    it('bbb-postf.png should have size of 250x250', function(done){
        var callbackFn = function(err, image){
            expect(err).to.be.a('null');
            expect(image.bitmap.width).to.be.equal(250);
            expect(image.bitmap.height).to.be.equal(250);

            done();
        };

        jimp.read('./test/resources/job/bbb-postf.png', callbackFn);
    });
    it('ccc-postf.png should have size of 250x250', function(done){
        var callbackFn = function(err, image){
            expect(err).to.be.a('null');
            expect(image.bitmap.width).to.be.equal(250);
            expect(image.bitmap.height).to.be.equal(250);

            done();
        };

        jimp.read('./test/resources/job/ccc-postf.png', callbackFn);
    });
    it('Should delete file bbb-postf.png', function(done){
        var callbackFn = function(err){
            expect(err).to.be.a('null');

            done();
        };

        fs.remove('./test/resources/job/bbb-postf.png', callbackFn);
    });
    it('Should delete file ccc-postf.png', function(done){
        var callbackFn = function(err){
            expect(err).to.be.a('null');

            done();
        };

        fs.remove('./test/resources/job/ccc-postf.png', callbackFn);
    });
});