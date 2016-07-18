/**
 * Created by lol on 02.07.2016.
 */

'use strict';

var path = require('path'),
    expect = require('chai').expect;

var fileResolver = require('../app/fileResolver.js');

describe('Listing files', function(){
    it('Should list only files with *.png format', function(done){
        var callbackFn = function(err, files){
            expect(err).to.be.a('null');
            expect(files).to.be.ok;
            expect(files).to.be.an('array');
            expect(files).to.have.lengthOf(1);
            expect(path.basename(files[0])).to.be.equal('mona-png.png');

            done();
        };

        fileResolver.list({
            basedir: './test/resources/different_formats',
            extension: { include: 'png' },
            callback: callbackFn
        });
    });
    it('Should list only files with *.jpg format', function(done){
        var callbackFn = function(err, files){
            expect(err).to.be.a('null');
            expect(files).to.be.ok;
            expect(files).to.be.an('array');
            expect(files).to.have.lengthOf(3);

            var variants = ['mona-jpg3.jpg', 'mona-jpg8.jpg', 'mona-jpg12.jpg'];

            for(var i = 0 ; i < files.length ; i++){
                expect(path.basename(files[i])).to.be.oneOf(variants);
            }

            done();
        };

        fileResolver.list({
            basedir: './test/resources/different_formats',
            extension: { include: 'jpg' },
            callback: callbackFn
        });
    });
    it('Should list only files with *.gif and *.bmp formats', function(done){
        var callbackFn = function(err, files){
            expect(err).to.be.a('null');
            expect(files).to.be.ok;
            expect(files).to.be.an('array');
            expect(files).to.have.lengthOf(4);

            var variants = ['mona-bmp16.bmp', 'mona-bmp24.bmp', 'mona-bmp32.bmp', 'mona-gif.gif'];

            for(var i = 0 ; i < files.length ; i++){
                expect(path.basename(files[i])).to.be.oneOf(variants);
            }

            done();
        };

        fileResolver.list({
            basedir: './test/resources/different_formats',
            extension: { include: 'gif,bmp' },
            callback: callbackFn
        });
    });
    it('Should list all files excluding *.gif format', function(done){
        var callbackFn = function(err, files){
            expect(err).to.be.a('null');
            expect(files).to.be.ok;
            expect(files).to.be.an('array');
            expect(files).to.have.lengthOf(7);

            var fileNames = [],
                variants = [
                    'mona-bmp16.bmp',
                    'mona-bmp24.bmp',
                    'mona-bmp32.bmp',
                    'mona-png.png',
                    'mona-jpg3.jpg',
                    'mona-jpg8.jpg',
                    'mona-jpg12.jpg'
                ];

            for(var i = 0 ; i < files.length ; i++){
                fileNames[i] = path.basename(files[i]);
            }

            fileNames.sort();
            variants.sort();

            expect(fileNames).to.deep.equal(variants);

            done();
        };

        fileResolver.list({
            basedir: './test/resources/different_formats',
            extension: { exclude: 'gif' },
            callback: callbackFn
        });
    });
    it('Should list only files with %aaa% names', function(done){
        var callbackFn = function(err, files){
            expect(err).to.be.a('null');
            expect(files).to.be.ok;
            expect(files).to.be.an('array');
            expect(files).to.have.lengthOf(2);

            var fileNames = [],
                variants = ['1aaa1.jpg', '11aaa22.jpg'];

            for(var i = 0 ; i < files.length ; i++){
                fileNames[i] = path.basename(files[i]);
            }

            fileNames.sort();
            variants.sort();

            expect(fileNames).to.deep.equal(variants);

            done();
        };

        fileResolver.list({
            basedir: './test/resources/different_names',
            name: { include: '%aaa%' },
            callback: callbackFn
        });
    });
    it('Should exclude files with %aaa% names', function(done){
        var callbackFn = function(err, files){
            expect(err).to.be.a('null');
            expect(files).to.be.ok;
            expect(files).to.be.an('array');
            expect(files).to.have.lengthOf(9);

            var fileNames = [],
                variants = [
                    '1aaa.jpg',
                    'aaa.jpg',
                    'aaa1.jpg',
                    'aaabbb.jpg',
                    'ab.jpg',
                    'aba.jpg',
                    'abb.jpg',
                    'b.jpg',
                    'aca.jpg'
                ];

            for(var i = 0 ; i < files.length ; i++){
                fileNames[i] = path.basename(files[i]);
            }

            fileNames.sort();
            variants.sort();

            expect(fileNames).to.deep.equal(variants);

            done();
        };

        fileResolver.list({
            basedir: './test/resources/different_names',
            name: { exclude: '%aaa%' },
            callback: callbackFn
        });
    });
    it('Should list only files with _aaa_ names', function(done){
        var callbackFn = function(err, files){
            expect(err).to.be.a('null');
            expect(files).to.be.ok;
            expect(files).to.be.an('array');
            expect(files).to.have.lengthOf(1);

            var fileNames = [],
                variants = ['1aaa1.jpg'];

            for(var i = 0 ; i < files.length ; i++){
                fileNames[i] = path.basename(files[i]);
            }

            fileNames.sort();
            variants.sort();

            expect(fileNames).to.deep.equal(variants);

            done();
        };

        fileResolver.list({
            basedir: './test/resources/different_names',
            name: { include: '_aaa_' },
            callback: callbackFn
        });
    });
    it('Should exclude files with _aaa_ names', function(done){
        var callbackFn = function(err, files){
            expect(err).to.be.a('null');
            expect(files).to.be.ok;
            expect(files).to.be.an('array');
            expect(files).to.have.lengthOf(10);

            var fileNames = [],
                variants = [
                    '1aaa.jpg',
                    '11aaa22.jpg',
                    'aaa.jpg',
                    'aaa1.jpg',
                    'aaabbb.jpg',
                    'ab.jpg',
                    'aba.jpg',
                    'abb.jpg',
                    'b.jpg',
                    'aca.jpg'
                ];

            for(var i = 0 ; i < files.length ; i++){
                fileNames[i] = path.basename(files[i]);
            }

            fileNames.sort();
            variants.sort();

            expect(fileNames).to.deep.equal(variants);

            done();
        };

        fileResolver.list({
            basedir: './test/resources/different_names',
            name: { exclude: '_aaa_' },
            callback: callbackFn
        });
    });
    it('Should list only files with a_a names', function(done){
        var callbackFn = function(err, files){
            expect(err).to.be.a('null');
            expect(files).to.be.ok;
            expect(files).to.be.an('array');
            expect(files).to.have.lengthOf(3);

            var fileNames = [],
                variants = ['aaa.jpg', 'aba.jpg', 'aca.jpg'];

            for(var i = 0 ; i < files.length ; i++){
                fileNames[i] = path.basename(files[i]);
            }

            fileNames.sort();
            variants.sort();

            expect(fileNames).to.deep.equal(variants);

            done();
        };

        fileResolver.list({
            basedir: './test/resources/different_names',
            name: { include: 'a_a' },
            callback: callbackFn
        });
    });
    it('Should exclude files with a_a names', function(done){
        var callbackFn = function(err, files){
            expect(err).to.be.a('null');
            expect(files).to.be.ok;
            expect(files).to.be.an('array');
            expect(files).to.have.lengthOf(10);

            var fileNames = [],
                variants = [
                    '1aaa.jpg',
                    '11aaa22.jpg',
                    'aaa.jpg',
                    'aaa1.jpg',
                    'aaabbb.jpg',
                    'ab.jpg',
                    'aba.jpg',
                    'abb.jpg',
                    'aca.jpg',
                    'b.jpg'
                ];

            for(var i = 0 ; i < files.length ; i++){
                fileNames[i] = path.basename(files[i]);
            }

            fileNames.sort();
            variants.sort();

            expect(fileNames).to.deep.equal(variants);

            done();
        };

        fileResolver.list({
            basedir: './test/resources/different_names',
            name: { exclude: '_aaa_' },
            callback: callbackFn
        });
    });
    it('Should list only files with %ab% names', function(done){
        var callbackFn = function(err, files){
            expect(err).to.be.a('null');
            expect(files).to.be.ok;
            expect(files).to.be.an('array');
            expect(files).to.have.lengthOf(1);

            var fileNames = [],
                variants = ['aaabbb.jpg'];

            for(var i = 0 ; i < files.length ; i++){
                fileNames[i] = path.basename(files[i]);
            }

            fileNames.sort();
            variants.sort();

            expect(fileNames).to.deep.equal(variants);

            done();
        };

        fileResolver.list({
            basedir: './test/resources/different_names',
            name: { include: '%ab%' },
            callback: callbackFn
        });
    });
    it('Should exclude files with %ab% names', function(done){
        var callbackFn = function(err, files){
            expect(err).to.be.a('null');
            expect(files).to.be.ok;
            expect(files).to.be.an('array');
            expect(files).to.have.lengthOf(10);

            var fileNames = [],
                variants = [
                    '1aaa.jpg',
                    '1aaa1.jpg',
                    '11aaa22.jpg',
                    'aaa.jpg',
                    'aaa1.jpg',
                    'ab.jpg',
                    'aba.jpg',
                    'abb.jpg',
                    'b.jpg',
                    'aca.jpg'
                ];

            for(var i = 0 ; i < files.length ; i++){
                fileNames[i] = path.basename(files[i]);
            }

            fileNames.sort();
            variants.sort();

            expect(fileNames).to.deep.equal(variants);

            done();
        };

        fileResolver.list({
            basedir: './test/resources/different_names',
            name: { exclude: '%ab%' },
            callback: callbackFn
        });
    });
    it('Should list only files with %a1 names', function(done){
        var callbackFn = function(err, files){
            expect(err).to.be.a('null');
            expect(files).to.be.ok;
            expect(files).to.be.an('array');
            expect(files).to.have.lengthOf(2);

            var fileNames = [],
                variants = ['1aaa1.jpg', 'aaa1.jpg'];

            for(var i = 0 ; i < files.length ; i++){
                fileNames[i] = path.basename(files[i]);
            }

            fileNames.sort();
            variants.sort();

            expect(fileNames).to.deep.equal(variants);

            done();
        };

        fileResolver.list({
            basedir: './test/resources/different_names',
            name: { include: '%a1' },
            callback: callbackFn
        });
    });
    it('Should exclude files with %a1 names', function(done){
        var callbackFn = function(err, files){
            expect(err).to.be.a('null');
            expect(files).to.be.ok;
            expect(files).to.be.an('array');
            expect(files).to.have.lengthOf(9);

            var fileNames = [],
                variants = [
                    '1aaa.jpg',
                    '11aaa22.jpg',
                    'aaa.jpg',
                    'aaabbb.jpg',
                    'ab.jpg',
                    'aba.jpg',
                    'abb.jpg',
                    'b.jpg',
                    'aca.jpg'
                ];

            for(var i = 0 ; i < files.length ; i++){
                fileNames[i] = path.basename(files[i]);
            }

            fileNames.sort();
            variants.sort();

            expect(fileNames).to.deep.equal(variants);

            done();
        };

        fileResolver.list({
            basedir: './test/resources/different_names',
            name: { exclude: '%a1' },
            callback: callbackFn
        });
    });
    it('Should list only files with 1% names', function(done){
        var callbackFn = function(err, files){
            expect(err).to.be.a('null');
            expect(files).to.be.ok;
            expect(files).to.be.an('array');
            expect(files).to.have.lengthOf(3);

            var fileNames = [],
                variants = ['1aaa1.jpg', '1aaa.jpg', '11aaa22.jpg'];

            for(var i = 0 ; i < files.length ; i++){
                fileNames[i] = path.basename(files[i]);
            }

            fileNames.sort();
            variants.sort();

            expect(fileNames).to.deep.equal(variants);

            done();
        };

        fileResolver.list({
            basedir: './test/resources/different_names',
            name: { include: '1%' },
            callback: callbackFn
        });
    });
    it('Should exclude files with 1% names', function(done){
        var callbackFn = function(err, files){
            expect(err).to.be.a('null');
            expect(files).to.be.ok;
            expect(files).to.be.an('array');
            expect(files).to.have.lengthOf(8);

            var fileNames = [],
                variants = [
                    'aaa.jpg',
                    'aaa1.jpg',
                    'aaabbb.jpg',
                    'ab.jpg',
                    'aba.jpg',
                    'abb.jpg',
                    'b.jpg',
                    'aca.jpg'
                ];

            for(var i = 0 ; i < files.length ; i++){
                fileNames[i] = path.basename(files[i]);
            }

            fileNames.sort();
            variants.sort();

            expect(fileNames).to.deep.equal(variants);

            done();
        };

        fileResolver.list({
            basedir: './test/resources/different_names',
            name: { exclude: '1%' },
            callback: callbackFn
        });
    });
    it('Should list only files with _b names', function(done){
        var callbackFn = function(err, files){
            expect(err).to.be.a('null');
            expect(files).to.be.ok;
            expect(files).to.be.an('array');
            expect(files).to.have.lengthOf(1);

            var fileNames = [],
                variants = ['ab.jpg'];

            for(var i = 0 ; i < files.length ; i++){
                fileNames[i] = path.basename(files[i]);
            }

            fileNames.sort();
            variants.sort();

            expect(fileNames).to.deep.equal(variants);

            done();
        };

        fileResolver.list({
            basedir: './test/resources/different_names',
            name: { include: '_b' },
            callback: callbackFn
        });
    });
    it('Should exclude files with _b names', function(done){
        var callbackFn = function(err, files){
            expect(err).to.be.a('null');
            expect(files).to.be.ok;
            expect(files).to.be.an('array');
            expect(files).to.have.lengthOf(10);

            var fileNames = [],
                variants = [
                    '1aaa.jpg',
                    '1aaa1.jpg',
                    '11aaa22.jpg',
                    'aaa.jpg',
                    'aaa1.jpg',
                    'aaabbb.jpg',
                    'aba.jpg',
                    'abb.jpg',
                    'b.jpg',
                    'aca.jpg'
                ];

            for(var i = 0 ; i < files.length ; i++){
                fileNames[i] = path.basename(files[i]);
            }

            fileNames.sort();
            variants.sort();

            expect(fileNames).to.deep.equal(variants);

            done();
        };

        fileResolver.list({
            basedir: './test/resources/different_names',
            name: { exclude: '_b' },
            callback: callbackFn
        });
    });
    it('Should list only files with a_ names', function(done){
        var callbackFn = function(err, files){
            expect(err).to.be.a('null');
            expect(files).to.be.ok;
            expect(files).to.be.an('array');
            expect(files).to.have.lengthOf(1);

            var fileNames = [],
                variants = ['ab.jpg'];

            for(var i = 0 ; i < files.length ; i++){
                fileNames[i] = path.basename(files[i]);
            }

            fileNames.sort();
            variants.sort();

            expect(fileNames).to.deep.equal(variants);

            done();
        };

        fileResolver.list({
            basedir: './test/resources/different_names',
            name: { include: 'a_' },
            callback: callbackFn
        });
    });
    it('Should exclude files with a_ names', function(done){
        var callbackFn = function(err, files){
            expect(err).to.be.a('null');
            expect(files).to.be.ok;
            expect(files).to.be.an('array');
            expect(files).to.have.lengthOf(10);

            var fileNames = [],
                variants = [
                    '1aaa.jpg',
                    '1aaa1.jpg',
                    '11aaa22.jpg',
                    'aaa.jpg',
                    'aaa1.jpg',
                    'aaabbb.jpg',
                    'aba.jpg',
                    'abb.jpg',
                    'b.jpg',
                    'aca.jpg'
                ];

            for(var i = 0 ; i < files.length ; i++){
                fileNames[i] = path.basename(files[i]);
            }

            fileNames.sort();
            variants.sort();

            expect(fileNames).to.deep.equal(variants);

            done();
        };

        fileResolver.list({
            basedir: './test/resources/different_names',
            name: { exclude: 'a_' },
            callback: callbackFn
        });
    });
    it('Should list only files with a%b names', function(done){
        var callbackFn = function(err, files){
            expect(err).to.be.a('null');
            expect(files).to.be.ok;
            expect(files).to.be.an('array');
            expect(files).to.have.lengthOf(2);

            var fileNames = [],
                variants = ['aaabbb.jpg', 'abb.jpg'];

            for(var i = 0 ; i < files.length ; i++){
                fileNames[i] = path.basename(files[i]);
            }

            fileNames.sort();
            variants.sort();

            expect(fileNames).to.deep.equal(variants);

            done();
        };

        fileResolver.list({
            basedir: './test/resources/different_names',
            name: { include: 'a%b' },
            callback: callbackFn
        });
    });
    it('Should exclude files with a%b names', function(done){
        var callbackFn = function(err, files){
            expect(err).to.be.a('null');
            expect(files).to.be.ok;
            expect(files).to.be.an('array');
            expect(files).to.have.lengthOf(9);

            var fileNames = [],
                variants = [
                    '1aaa.jpg',
                    '1aaa1.jpg',
                    '11aaa22.jpg',
                    'aaa.jpg',
                    'aaa1.jpg',
                    'ab.jpg',
                    'aba.jpg',
                    'b.jpg',
                    'aca.jpg'
                ];

            for(var i = 0 ; i < files.length ; i++){
                fileNames[i] = path.basename(files[i]);
            }

            fileNames.sort();
            variants.sort();

            expect(fileNames).to.deep.equal(variants);

            done();
        };

        fileResolver.list({
            basedir: './test/resources/different_names',
            name: { exclude: 'a%b' },
            callback: callbackFn
        });
    });
    it('Should list only files with % names', function(done){
        var callbackFn = function(err, files){
            expect(err).to.be.a('null');
            expect(files).to.be.ok;
            expect(files).to.be.an('array');
            expect(files).to.have.lengthOf(11);

            var fileNames = [],
                variants = [
                    '1aaa.jpg',
                    '1aaa1.jpg',
                    '11aaa22.jpg',
                    'aaa.jpg',
                    'aaa1.jpg',
                    'aaabbb.jpg',
                    'ab.jpg',
                    'aba.jpg',
                    'abb.jpg',
                    'b.jpg',
                    'aca.jpg'
                ];

            for(var i = 0 ; i < files.length ; i++){
                fileNames[i] = path.basename(files[i]);
            }

            fileNames.sort();
            variants.sort();

            expect(fileNames).to.deep.equal(variants);

            done();
        };

        fileResolver.list({
            basedir: './test/resources/different_names',
            name: { include: '%' },
            callback: callbackFn
        });
    });
    it('Should exclude files with % names', function(done){
        var callbackFn = function(err, files){
            expect(err).to.be.a('null');
            expect(files).to.be.ok;
            expect(files).to.be.an('array');
            expect(files).to.have.lengthOf(0);

            done();
        };

        fileResolver.list({
            basedir: './test/resources/different_names',
            name: { exclude: '%' },
            callback: callbackFn
        });
    });
    it('Should list only files with _ names', function(done){
        var callbackFn = function(err, files){
            expect(err).to.be.a('null');
            expect(files).to.be.ok;
            expect(files).to.be.an('array');
            expect(files).to.have.lengthOf(1);

            var fileNames = [],
                variants = ['b.jpg'];

            for(var i = 0 ; i < files.length ; i++){
                fileNames[i] = path.basename(files[i]);
            }

            fileNames.sort();
            variants.sort();

            expect(fileNames).to.deep.equal(variants);

            done();
        };

        fileResolver.list({
            basedir: './test/resources/different_names',
            name: { include: '_' },
            callback: callbackFn
        });
    });
    it('Should exclude files with _ names', function(done){
        var callbackFn = function(err, files){
            expect(err).to.be.a('null');
            expect(files).to.be.ok;
            expect(files).to.be.an('array');
            expect(files).to.have.lengthOf(10);

            var fileNames = [],
                variants = [
                    '1aaa.jpg',
                    '1aaa1.jpg',
                    '11aaa22.jpg',
                    'aaa.jpg',
                    'aaa1.jpg',
                    'aaabbb.jpg',
                    'ab.jpg',
                    'aba.jpg',
                    'abb.jpg',
                    'aca.jpg'
                ];

            for(var i = 0 ; i < files.length ; i++){
                fileNames[i] = path.basename(files[i]);
            }

            fileNames.sort();
            variants.sort();

            expect(fileNames).to.deep.equal(variants);

            done();
        };

        fileResolver.list({
            basedir: './test/resources/different_names',
            name: { exclude: '_' },
            callback: callbackFn
        });
    });
    it('Should return error when using pattern %_', function(done){
        var callbackFn = function(err, files){
            expect(err).to.not.be.a('null');
            expect(err).to.not.be.a('undefined');
            expect(files).to.be.a('null');

            expect(err.message).to.be.equal('Cannot use % token beside of any other wildcard token');

            done();
        };

        fileResolver.list({
            basedir: './test/resources/different_names',
            name: { include: '%_' },
            callback: callbackFn
        });
    });
    it('Should return error when using pattern _%', function(done){
        var callbackFn = function(err, files){
            expect(err).to.not.be.a('null');
            expect(err).to.not.be.a('undefined');
            expect(files).to.be.a('null');

            expect(err.message).to.be.equal('Cannot use % token beside of any other wildcard token');

            done();
        };

        fileResolver.list({
            basedir: './test/resources/different_names',
            name: { include: '_%' },
            callback: callbackFn
        });
    });
    it('Should return error when using pattern %%', function(done){
        var callbackFn = function(err, files){
            expect(err).to.not.be.a('null');
            expect(err).to.not.be.a('undefined');
            expect(files).to.be.a('null');

            expect(err.message).to.be.equal('Cannot use % token beside of any other wildcard token');

            done();
        };

        fileResolver.list({
            basedir: './test/resources/different_names',
            name: { include: '%%' },
            callback: callbackFn
        });
    });
    it('Should return error when using pattern %%%', function(done){
        var callbackFn = function(err, files){
            expect(err).to.not.be.a('null');
            expect(err).to.not.be.a('undefined');
            expect(files).to.be.a('null');

            expect(err.message).to.be.equal('Cannot use % token beside of any other wildcard token');

            done();
        };

        fileResolver.list({
            basedir: './test/resources/different_names',
            name: { include: '%%%' },
            callback: callbackFn
        });
    });
    it('Should return error when using pattern _%_', function(done){
        var callbackFn = function(err, files){
            expect(err).to.not.be.a('null');
            expect(err).to.not.be.a('undefined');
            expect(files).to.be.a('null');

            expect(err.message).to.be.equal('Cannot use % token beside of any other wildcard token');

            done();
        };

        fileResolver.list({
            basedir: './test/resources/different_names',
            name: { include: '_%_' },
            callback: callbackFn
        });
    });
});