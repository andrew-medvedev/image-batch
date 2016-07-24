/**
 * Created by lol on 02.07.2016.
 */

'use strict';

var expect = require('chai').expect,
    _ = require('underscore');

var directiveBuilder = require('../app/directiveBuilder.js');

describe('Building directives', function(){
    it('Should build resizing png files into new file with 50% of size and postfix "-medium"', function(done){
        var directiveObject = directiveBuilder('path/to/images', _.noop)
            .onlyFormat('png')
            .resizePercent(50)
            .withPostfix('medium')
            .getDirectiveObject();

        expect(directiveObject).to.deep.equal({
            basedir: 'path/to/images',
            extension: {
                include: 'png'
            },
            resize: '50%',
            postfix: 'medium',
            postfixDelimiter: '-',
            removeOriginal: false
        });

        done();
    });
    it('Should build resizing png files into new file with 50% of size variant 2', function(done){
        var directiveObject = directiveBuilder('path/to/images', _.noop)
            .formats('png')
            .resize('50%')
            .getDirectiveObject();

        expect(directiveObject).to.deep.equal({
            basedir: 'path/to/images',
            extension: {
                include: ['png']
            },
            resize: '50%',
            postfix: '',
            postfixDelimiter: '-',
            removeOriginal: false
        });

        done();
    });
    it('Should build resizing by width of 500 for bmp and png files ' +
        'excluding dirs "a", "b" and "c" and including _bb_ filenames', function(done){
        var directiveObject = directiveBuilder('path/to/images', _.noop)
            .formats('bmp', 'png')
            .resizeWidth(500)
            .includeFilename('_bb_')
            .getDirectiveObject();

        expect(directiveObject).to.deep.equal({
            basedir: 'path/to/images',
            extension: {
                include: ['bmp', 'png']
            },
            name: {
                include: '_bb_'
            },
            resize: 'w500',
            postfix: '',
            postfixDelimiter: '-',
            removeOriginal: false
        });

        done();
    });
    it('Should build resizing by width of 500 for bmp and png files ' +
        'excluding dirs "a", "b" and "c" and including _bb_ filenames, remove original variant 2', function(done){
        var directiveObject = directiveBuilder('path/to/images', _.noop)
            .formats(['bmp'], 'png')
            .resize('w500')
            .includeFilename(['_bb_'])
            .removeOriginal()
            .getDirectiveObject();

        expect(directiveObject).to.deep.equal({
            basedir: 'path/to/images',
            extension: {
                include: ['bmp', 'png']
            },
            name: {
                include: '_bb_'
            },
            resize: 'w500',
            postfix: '',
            postfixDelimiter: '-',
            removeOriginal: true
        });

        done();
    });
    it('Should build resizing by width of 500 for files with all extensions excepting gif' +
        'excluding dirs "a", "b" and "c" and including _bb_ filenames, remove original variant 2', function(done){
        var directiveObject = directiveBuilder('path/to/images', _.noop)
            .withoutFormat('gif')
            .resize('w500')
            .includeFilename(['_bb_'])
            .removeOriginal()
            .getDirectiveObject();

        expect(directiveObject).to.deep.equal({
            basedir: 'path/to/images',
            extension: {
                include: ['bmp', 'png', 'jpg', 'jpeg']
            },
            name: {
                include: '_bb_'
            },
            resize: 'w500',
            postfix: '',
            postfixDelimiter: '-',
            removeOriginal: true
        });

        done();
    });
    it('Should build resizing by width of 500 for files with all extensions and convert it all to png' +
        'excluding dirs "a", "b" and "c" and including _bb_ filenames, remove original variant 2', function(done){
        var directiveObject = directiveBuilder('path/to/images', _.noop)
            .withoutFormat('gif')
            .resize('w500')
            .includeFilename(['_bb_'])
            .removeOriginal()
            .saveAs('png')
            .getDirectiveObject();

        expect(directiveObject).to.deep.equal({
            basedir: 'path/to/images',
            extension: {
                include: ['bmp', 'png', 'jpg', 'jpeg']
            },
            name: {
                include: '_bb_'
            },
            resize: 'w500',
            saveAsFormat: 'png',
            postfix: '',
            postfixDelimiter: '-',
            removeOriginal: true
        });

        done();
    });
});