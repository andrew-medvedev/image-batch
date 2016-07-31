/**
 * Created by ihatemicro$oft on 17.07.2016.
 */

'use strict';

var expect = require('chai').expect;

var patternMatcher = require('./patternMatcher.js');

describe('Utils', function(){
    it('Should getAllIndexesOfSubstring test 1', function(done){
        var str = 'aabbaabb',
            sub1 = 'aa', sub2 = 'bb';

        var out1 = patternMatcher.getAllIndexesOfSubstring(str, 0, sub1),
            out2 = patternMatcher.getAllIndexesOfSubstring(str, 0, sub2);

        expect(out1).to.deep.equal([0, 4]);
        expect(out2).to.deep.equal([2, 6]);

        done();
    });
    it('Should getAllIndexesOfSubstring test 2', function(done){
        var str = 'abbaababbaababababab',
            sub1 = 'aa', sub2 = 'bb', sub3 = 'ab', sub4 = 'ba';

        var from1 = 0, from2 = 4, from3 = 8;

        var out1 = patternMatcher.getAllIndexesOfSubstring(str, from1, sub1),
            out2 = patternMatcher.getAllIndexesOfSubstring(str, from2, sub1),
            out3 = patternMatcher.getAllIndexesOfSubstring(str, from3, sub1),
            out4 = patternMatcher.getAllIndexesOfSubstring(str, from1, sub2),
            out5 = patternMatcher.getAllIndexesOfSubstring(str, from2, sub2),
            out6 = patternMatcher.getAllIndexesOfSubstring(str, from3, sub2);
        var out7 = patternMatcher.getAllIndexesOfSubstring(str, from1, sub3),
            out8 = patternMatcher.getAllIndexesOfSubstring(str, from2, sub3),
            out9 = patternMatcher.getAllIndexesOfSubstring(str, from3, sub3),
            out10 = patternMatcher.getAllIndexesOfSubstring(str, from1, sub4),
            out11 = patternMatcher.getAllIndexesOfSubstring(str, from2, sub4),
            out12 = patternMatcher.getAllIndexesOfSubstring(str, from3, sub4);

        expect(out1).to.deep.equal([3, 9]);
        expect(out2).to.deep.equal([9]);
        expect(out3).to.deep.equal([9]);
        expect(out4).to.deep.equal([1, 7]);
        expect(out5).to.deep.equal([7]);
        expect(out6).to.deep.equal([]);
        expect(out7).to.deep.equal([0, 4, 6, 10, 12, 14, 16, 18]);
        expect(out8).to.deep.equal([4, 6, 10, 12, 14, 16, 18]);
        expect(out9).to.deep.equal([10, 12, 14, 16, 18]);
        expect(out10).to.deep.equal([2, 5, 8, 11, 13, 15, 17]);
        expect(out11).to.deep.equal([5, 8, 11, 13, 15, 17]);
        expect(out12).to.deep.equal([8, 11, 13, 15, 17]);

        done();
    });
});
describe('Matching pattern aaa', function(){
    it('Should match subject aaa and pattern a_a and return true', function(done){
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(true);

            done();
        };

        patternMatcher.match('aaa', 'a_a', callbackFn);
    });
    it('Should match subject aaa and pattern a%a and return true', function(done){
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(true);

            done();
        };

        patternMatcher.match('aaa', 'a%a', callbackFn);
    });
    it('Should match subject aaa and pattern b_b and return false', function(done){
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('aaa', 'b_b', callbackFn);
    });
    it('Should match subject aaa and pattern b%b and return false', function(done){
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('aaa', 'b%b', callbackFn);
    });
    it('Should match subject aaa and pattern _a and return false', function(done){
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('aaa', '_a', callbackFn);
    });
    it('Should match subject aaa and pattern %a and return true', function(done){
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(true);

            done();
        };

        patternMatcher.match('aaa', '%a', callbackFn);
    });
    it('Should match subject aaa and pattern a_ and return false', function(done){
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('aaa', 'a_', callbackFn);
    });
    it('Should match subject aaa and pattern a% and return true', function(done){
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(true);

            done();
        };

        patternMatcher.match('aaa', 'a%', callbackFn);
    });
    it('Should match subject aaa and pattern aa%aa and return false', function(done){
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('aaa', 'aa%aa', callbackFn);
    });
    it('Should match subject aaa and pattern aa__aa and return false', function(done){
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('aaa', 'aa__aa', callbackFn);
    });
    it('Should match subject aaa and pattern __ and return false', function(done){
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('aaa', '__', callbackFn);
    });
    it('Should match subject aaa and pattern a__ and return true', function(done){
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(true);

            done();
        };

        patternMatcher.match('aaa', 'a__', callbackFn);
    });
    it('Should match subject aaa and pattern __a and return true', function(done){
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(true);

            done();
        };

        patternMatcher.match('aaa', '__a', callbackFn);
    });
    it('Should match subject aaa and pattern a__b and return false', function(done){
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('aaa', 'a__b', callbackFn);
    });
    it('Should match subject aaa and pattern a%b and return false', function(done){
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('aaa', 'a%b', callbackFn);
    });
    it('Should match subject aaa and pattern a%b% and return false', function(done){
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('aaa', 'a%b%', callbackFn);
    });
    it('Should match subject aaa and pattern _a%a_ and return false', function(done){
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('aaa', '_a%a_', callbackFn);
    });
    it('Should match subject aaa and pattern %b__a and return false', function(done){
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('aaa', '%b__a', callbackFn);
    });
    it('Should match subject aaa and pattern %b_a% and return false', function(done){
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('aaa', '%b_a%', callbackFn);
    });
});
describe('Matching pattern abab', function(){
    it('Should match subject abab and pattern a_a and return false', function(done){
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('abab', 'a_a', callbackFn);
    });
    it('Should match subject abab and pattern a%a and return false', function(done){
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('abab', 'a%a', callbackFn);
    });
    it('Should match subject abab and pattern b_b and return false', function(done){
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('abab', 'b_b', callbackFn);
    });
    it('Should match subject abab and pattern b%b and return false', function(done){
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('abab', 'b%b', callbackFn);
    });
    it('Should match subject abab and pattern _a and return false', function(done){
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('abab', '_a', callbackFn);
    });
    it('Should match subject abab and pattern %a and return false', function(done){
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('abab', '%a', callbackFn);
    });
    it('Should match subject abab and pattern a_ and return false', function(done){
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('abab', 'a_', callbackFn);
    });
    it('Should match subject abab and pattern a% and return true', function(done){
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(true);

            done();
        };

        patternMatcher.match('abab', 'a%', callbackFn);
    });
    it('Should match subject abab and pattern aa%aa and return false', function(done){
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('abab', 'aa%aa', callbackFn);
    });
    it('Should match subject abab and pattern aa__aa and return false', function(done){
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('abab', 'aa__aa', callbackFn);
    });
    it('Should match subject abab and pattern __ and return false', function(done){
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('abab', '__', callbackFn);
    });
    it('Should match subject abab and pattern a__ and return false', function(done){
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('abab', 'a__', callbackFn);
    });
    it('Should match subject abab and pattern __a and return false', function(done){
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('abab', '__a', callbackFn);
    });
    it('Should match subject abab and pattern a__b and return true', function(done){
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(true);

            done();
        };

        patternMatcher.match('abab', 'a__b', callbackFn);
    });
    it('Should match subject abab and pattern a%b and return true', function(done){
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(true);

            done();
        };

        patternMatcher.match('abab', 'a%b', callbackFn);
    });
    it('Should match subject abab and pattern a%b% and return false', function(done){
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('abab', 'a%b%', callbackFn);
    });
    it('Should match subject abab and pattern _a%a_ and return false', function(done){
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('abab', '_a%a_', callbackFn);
    });
    it('Should match subject abab and pattern %b__a and return false', function(done){
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('abab', '%b__a', callbackFn);
    });
    it('Should match subject abab and pattern %b_a% and return false', function(done){
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('abab', '%b_a%', callbackFn);
    });
});
describe('Matching pattern abb', function() {
    it('Should match subject abb and pattern a_a and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('abb', 'a_a', callbackFn);
    });
    it('Should match subject abb and pattern a%a and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('abb', 'a%a', callbackFn);
    });
    it('Should match subject abb and pattern b_b and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('abb', 'b_b', callbackFn);
    });
    it('Should match subject abb and pattern b%b and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('abb', 'b%b', callbackFn);
    });
    it('Should match subject abb and pattern _a and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('abb', '_a', callbackFn);
    });
    it('Should match subject abb and pattern %a and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('abb', '%a', callbackFn);
    });
    it('Should match subject abb and pattern a_ and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('abb', 'a_', callbackFn);
    });
    it('Should match subject abb and pattern a% and return true', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(true);

            done();
        };

        patternMatcher.match('abb', 'a%', callbackFn);
    });
    it('Should match subject abb and pattern aa%aa and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('abb', 'aa%aa', callbackFn);
    });
    it('Should match subject abb and pattern aa__aa and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('abb', 'aa__aa', callbackFn);
    });
    it('Should match subject abb and pattern __ and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('abb', '__', callbackFn);
    });
    it('Should match subject abb and pattern a__ and return true', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(true);

            done();
        };

        patternMatcher.match('abb', 'a__', callbackFn);
    });
    it('Should match subject abb and pattern __a and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('abb', '__a', callbackFn);
    });
    it('Should match subject abb and pattern a__b and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('abb', 'a__b', callbackFn);
    });
    it('Should match subject abb and pattern a%b and return true', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(true);

            done();
        };

        patternMatcher.match('abb', 'a%b', callbackFn);
    });
    it('Should match subject abb and pattern a%b% and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('abb', 'a%b%', callbackFn);
    });
    it('Should match subject abb and pattern _a%a_ and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('abb', '_a%a_', callbackFn);
    });
    it('Should match subject abb and pattern %b__a and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('abb', '%b__a', callbackFn);
    });
    it('Should match subject abb and pattern %b_a% and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('abb', '%b__a', callbackFn);
    });
});
describe('Matching pattern aab', function() {
    it('Should match subject aab and pattern a_a and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('aab', 'a_a', callbackFn);
    });
    it('Should match subject aab and pattern a%a and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('aab', 'a%a', callbackFn);
    });
    it('Should match subject aab and pattern b_b and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('aab', 'b_b', callbackFn);
    });
    it('Should match subject aab and pattern b%b and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('aab', 'b%b', callbackFn);
    });
    it('Should match subject aab and pattern _a and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('aab', '_a', callbackFn);
    });
    it('Should match subject aab and pattern %a and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('aab', '%a', callbackFn);
    });
    it('Should match subject aab and pattern a_ and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('aab', 'a_', callbackFn);
    });
    it('Should match subject aab and pattern a% and return true', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(true);

            done();
        };

        patternMatcher.match('aab', 'a%', callbackFn);
    });
    it('Should match subject aab and pattern aa%aa and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('aab', 'aa%aa', callbackFn);
    });
    it('Should match subject aab and pattern aa__aa and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('aab', 'aa__aa', callbackFn);
    });
    it('Should match subject aab and pattern __ and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('aab', '__', callbackFn);
    });
    it('Should match subject aab and pattern a__ and return true', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(true);

            done();
        };

        patternMatcher.match('aab', 'a__', callbackFn);
    });
    it('Should match subject aab and pattern __a and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('aab', '__a', callbackFn);
    });
    it('Should match subject aab and pattern a__b and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('aab', 'a__b', callbackFn);
    });
    it('Should match subject aab and pattern a%b and return true', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(true);

            done();
        };

        patternMatcher.match('aab', 'a%b', callbackFn);
    });
    it('Should match subject aab and pattern a%b% and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('aab', 'a%b%', callbackFn);
    });
    it('Should match subject aab and pattern _a%a_ and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('aab', '_a%a_', callbackFn);
    });
    it('Should match subject aab and pattern %b__a and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('aab', '%b__a', callbackFn);
    });
    it('Should match subject aab and pattern %b_a% and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('aab', '%b_a%', callbackFn);
    });
});
describe('Matching pattern aabbaa', function() {
    it('Should match subject aabbaa and pattern a_a and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('aabbaa', 'a_a', callbackFn);
    });
    it('Should match subject aabbaa and pattern a%a and return true', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(true);

            done();
        };

        patternMatcher.match('aabbaa', 'a%a', callbackFn);
    });
    it('Should match subject aabbaa and pattern b_b and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('aabbaa', 'b_b', callbackFn);
    });
    it('Should match subject aabbaa and pattern b%b and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('aabbaa', 'b%b', callbackFn);
    });
    it('Should match subject aabbaa and pattern _a and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('aabbaa', '_a', callbackFn);
    });
    it('Should match subject aabbaa and pattern %a and return true', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(true);

            done();
        };

        patternMatcher.match('aabbaa', '%a', callbackFn);
    });
    it('Should match subject aabbaa and pattern a_ and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('aabbaa', 'a_', callbackFn);
    });
    it('Should match subject aabbaa and pattern a% and return true', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(true);

            done();
        };

        patternMatcher.match('aabbaa', 'a%', callbackFn);
    });
    it('Should match subject aabbaa and pattern aa%aa and return true', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(true);

            done();
        };

        patternMatcher.match('aabbaa', 'aa%aa', callbackFn);
    });
    it('Should match subject aabbaa and pattern aa__aa and return true', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(true);

            done();
        };

        patternMatcher.match('aabbaa', 'aa__aa', callbackFn);
    });
    it('Should match subject aabbaa and pattern __ and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('aabbaa', '__', callbackFn);
    });
    it('Should match subject aabbaa and pattern a__ and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('aabbaa', 'a__', callbackFn);
    });
    it('Should match subject aabbaa and pattern __a and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('aabbaa', '__a', callbackFn);
    });
    it('Should match subject aabbaa and pattern a__b and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('aabbaa', 'a__b', callbackFn);
    });
    it('Should match subject aabbaa and pattern a%b and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('aabbaa', 'a%b', callbackFn);
    });
    it('Should match subject aabbaa and pattern a%b% and return true', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(true);

            done();
        };

        patternMatcher.match('aabbaa', 'a%b%', callbackFn);
    });
    it('Should match subject aabbaa and pattern _a%a_ and return true', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(true);

            done();
        };

        patternMatcher.match('aabbaa', '_a%a_', callbackFn);
    });
    it('Should match subject aabbaa and pattern %b__a and return true', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(true);

            done();
        };

        patternMatcher.match('aabbaa', '%b__a', callbackFn);
    });
    it('Should match subject aabbaa and pattern %b_a% and return true', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(true);

            done();
        };

        patternMatcher.match('aabbaa', '%b_a%', callbackFn);
    });
});
describe('Matching pattern aabb', function() {
    it('Should match subject aabb and pattern a_a and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('aabb', 'a_a', callbackFn);
    });
    it('Should match subject aabb and pattern a%a and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('aabb', 'a%a', callbackFn);
    });
    it('Should match subject aabb and pattern b_b and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('aabb', 'b_b', callbackFn);
    });
    it('Should match subject aabb and pattern b%b and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('aabb', 'b%b', callbackFn);
    });
    it('Should match subject aabb and pattern _a and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('aabb', '_a', callbackFn);
    });
    it('Should match subject aabb and pattern %a and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('aabb', '%a', callbackFn);
    });
    it('Should match subject aabb and pattern a_ and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('aabb', 'a_', callbackFn);
    });
    it('Should match subject aabb and pattern a% and return true', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(true);

            done();
        };

        patternMatcher.match('aabb', 'a%', callbackFn);
    });
    it('Should match subject aabb and pattern aa%aa and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('aabb', 'aa%aa', callbackFn);
    });
    it('Should match subject aabb and pattern aa__aa and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('aabb', 'aa__aa', callbackFn);
    });
    it('Should match subject aabb and pattern __ and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('aabb', '__', callbackFn);
    });
    it('Should match subject aabb and pattern a__ and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('aabb', 'a__', callbackFn);
    });
    it('Should match subject aabb and pattern __a and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('aabb', '__a', callbackFn);
    });
    it('Should match subject aabb and pattern a__b and return true', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(true);

            done();
        };

        patternMatcher.match('aabb', 'a__b', callbackFn);
    });
    it('Should match subject aabb and pattern a%b and return true', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(true);

            done();
        };

        patternMatcher.match('aabb', 'a%b', callbackFn);
    });
    it('Should match subject aabb and pattern a%b% and return true', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(true);

            done();
        };

        patternMatcher.match('aabb', 'a%b%', callbackFn);
    });
    it('Should match subject aabb and pattern _a%a_ and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('aabb', '_a%a_', callbackFn);
    });
    it('Should match subject aabb and pattern %b__a and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('aabb', '%b__a', callbackFn);
    });
    it('Should match subject aabb and pattern %b_a% and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('aabb', '%b_a%', callbackFn);
    });
});
describe('Matching pattern ab', function() {
    it('Should match subject ab and pattern a_a and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('ab', 'a_a', callbackFn);
    });
    it('Should match subject ab and pattern a%a and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('ab', 'a%a', callbackFn);
    });
    it('Should match subject ab and pattern b_b and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('ab', 'b_b', callbackFn);
    });
    it('Should match subject ab and pattern b%b and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('ab', 'b%b', callbackFn);
    });
    it('Should match subject ab and pattern _a and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('ab', '_a', callbackFn);
    });
    it('Should match subject ab and pattern %a and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('ab', '%a', callbackFn);
    });
    it('Should match subject ab and pattern a_ and return true', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(true);

            done();
        };

        patternMatcher.match('ab', 'a_', callbackFn);
    });
    it('Should match subject ab and pattern a% and return true', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(true);

            done();
        };

        patternMatcher.match('ab', 'a%', callbackFn);
    });
    it('Should match subject ab and pattern aa%aa and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('ab', 'aa%aa', callbackFn);
    });
    it('Should match subject ab and pattern __ and return true', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(true);

            done();
        };

        patternMatcher.match('ab', '__', callbackFn);
    });
    it('Should match subject ab and pattern a__ and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('ab', 'a__', callbackFn);
    });
    it('Should match subject ab and pattern __a and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('ab', '__a', callbackFn);
    });
    it('Should match subject ab and pattern a__b and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('ab', 'a__b', callbackFn);
    });
    it('Should match subject ab and pattern a%b and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('ab', 'a%b', callbackFn);
    });
    it('Should match subject ab and pattern a%b% and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('ab', 'a%b%', callbackFn);
    });
    it('Should match subject ab and pattern _a%a_ and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('ab', '_a%a_', callbackFn);
    });
    it('Should match subject ab and pattern %b__a and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('ab', '%b__a', callbackFn);
    });
    it('Should match subject ab and pattern %b_a% and return false', function (done) {
        var callbackFn = function(err, match){
            expect(err).to.be.a('null');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('ab', '%b_a%', callbackFn);
    });
});
describe('Getting errors', function(){
    it('Should return error with pattern %%', function(done){
        var callbackFn = function(err, match){
            expect(err).to.not.be.a('null');
            expect(err).to.not.be.a('undefined');
            expect(err.message).to.be.equal('Cannot use % token beside of any other wildcard token');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('a', '%%', callbackFn);
    });
    it('Should return error with pattern _%', function(done){
        var callbackFn = function(err, match){
            expect(err).to.not.be.a('null');
            expect(err).to.not.be.a('undefined');
            expect(err.message).to.be.equal('Cannot use % token beside of any other wildcard token');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('a', '_%', callbackFn);
    });
    it('Should return error with pattern %_', function(done){
        var callbackFn = function(err, match){
            expect(err).to.not.be.a('null');
            expect(err).to.not.be.a('undefined');
            expect(err.message).to.be.equal('Cannot use % token beside of any other wildcard token');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('a', '%_', callbackFn);
    });
    it('Should return error with pattern aa%_%aa', function(done){
        var callbackFn = function(err, match){
            expect(err).to.not.be.a('null');
            expect(err).to.not.be.a('undefined');
            expect(err.message).to.be.equal('Cannot use % token beside of any other wildcard token');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('a', 'aa%_%aa', callbackFn);
    });
    it('Should return error with pattern %%%', function(done){
        var callbackFn = function(err, match){
            expect(err).to.not.be.a('null');
            expect(err).to.not.be.a('undefined');
            expect(err.message).to.be.equal('Cannot use % token beside of any other wildcard token');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('a', '%%%', callbackFn);
    });
    it('Should return error with pattern _%_', function(done){
        var callbackFn = function(err, match){
            expect(err).to.not.be.a('null');
            expect(err).to.not.be.a('undefined');
            expect(err.message).to.be.equal('Cannot use % token beside of any other wildcard token');
            expect(match).to.be.equal(false);

            done();
        };

        patternMatcher.match('a', '_%_', callbackFn);
    });
});