/**
 * Created by ihatemicro$oft on 17.07.2016.
 */

'use strict';

var expect = require('chai').expect;

var patternMatcher = require('../app/patternMatcher.js');

describe('Matching pattern aaa', function(){
    it('Should match subject aaa and pattern a_a and return true', function(done){

    });
    it('Should match subject aaa and pattern a%a and return true', function(done){

    });
    it('Should match subject aaa and pattern b_b and return false', function(done){

    });
    it('Should match subject aaa and pattern b%b and return false', function(done){

    });
    it('Should match subject aaa and pattern _a and return false', function(done){

    });
    it('Should match subject aaa and pattern %a and return true', function(done){

    });
    it('Should match subject aaa and pattern a_ and return false', function(done){

    });
    it('Should match subject aaa and pattern a% and return true', function(done){

    });
    it('Should match subject aaa and pattern aa%aa and return false', function(done){

    });
    it('Should match subject aaa and pattern aa__aa and return false', function(done){

    });
    it('Should match subject aaa and pattern __ and return false', function(done){

    });
    it('Should match subject aaa and pattern a__ and return true', function(done){

    });
    it('Should match subject aaa and pattern __a and return true', function(done){

    });
    it('Should match subject aaa and pattern a__b and return false', function(done){

    });
    it('Should match subject aaa and pattern a%b and return false', function(done){

    });
    it('Should match subject aaa and pattern a%b% and return false', function(done){

    });
    it('Should match subject aaa and pattern _a%a_ and return false', function(done){

    });
    it('Should match subject aaa and pattern %b__a and return false', function(done){

    });
    it('Should match subject aaa and pattern %b_a% and return false', function(done){

    });
});
describe('Matching pattern abab', function(){
    it('Should match subject abab and pattern a_a and return false', function(done){

    });
    it('Should match subject abab and pattern a%a and return false', function(done){

    });
    it('Should match subject abab and pattern b_b and return false', function(done){

    });
    it('Should match subject abab and pattern b%b and return false', function(done){

    });
    it('Should match subject abab and pattern _a and return false', function(done){

    });
    it('Should match subject abab and pattern %a and return false', function(done){

    });
    it('Should match subject abab and pattern a_ and return false', function(done){

    });
    it('Should match subject abab and pattern a% and return true', function(done){

    });
    it('Should match subject abab and pattern aa%aa and return false', function(done){

    });
    it('Should match subject abab and pattern aa__aa and return false', function(done){

    });
    it('Should match subject abab and pattern __ and return false', function(done){

    });
    it('Should match subject abab and pattern a__ and return false', function(done){

    });
    it('Should match subject abab and pattern __a and return false', function(done){

    });
    it('Should match subject abab and pattern a__b and return true', function(done){

    });
    it('Should match subject abab and pattern a%b and return true', function(done){

    });
    it('Should match subject abab and pattern a%b% and return false', function(done){

    });
    it('Should match subject abab and pattern _a%a_ and return false', function(done){

    });
    it('Should match subject abab and pattern %b__a and return false', function(done){

    });
    it('Should match subject abab and pattern %b_a% and return false', function(done){

    });
});
describe('Matching pattern abb', function() {
    it('Should match subject abb and pattern a_a and return false', function (done) {

    });
    it('Should match subject abb and pattern a%a and return false', function (done) {

    });
    it('Should match subject abb and pattern b_b and return false', function (done) {

    });
    it('Should match subject abb and pattern b%b and return false', function (done) {

    });
    it('Should match subject abb and pattern _a and return false', function (done) {

    });
    it('Should match subject abb and pattern %a and return false', function (done) {

    });
    it('Should match subject abb and pattern a_ and return false', function (done) {

    });
    it('Should match subject abb and pattern a% and return true', function (done) {

    });
    it('Should match subject abb and pattern aa%aa and return false', function (done) {

    });
    it('Should match subject abb and pattern aa__aa and return false', function (done) {

    });
    it('Should match subject abb and pattern __ and return false', function (done) {

    });
    it('Should match subject abb and pattern a__ and return true', function (done) {

    });
    it('Should match subject abb and pattern __a and return false', function (done) {

    });
    it('Should match subject abb and pattern a__b and return false', function (done) {

    });
    it('Should match subject abb and pattern a%b and return true', function (done) {

    });
    it('Should match subject abb and pattern a%b% and return false', function (done) {

    });
    it('Should match subject abb and pattern _a%a_ and return false', function (done) {

    });
    it('Should match subject abb and pattern %b__a and return false', function (done) {

    });
    it('Should match subject abb and pattern %b_a% and return false', function (done) {

    });
});
describe('Matching pattern aab', function() {
    it('Should match subject aab and pattern a_a and return false', function (done) {

    });
    it('Should match subject aab and pattern a%a and return false', function (done) {

    });
    it('Should match subject aab and pattern b_b and return false', function (done) {

    });
    it('Should match subject aab and pattern b%b and return false', function (done) {

    });
    it('Should match subject aab and pattern _a and return false', function (done) {

    });
    it('Should match subject aab and pattern %a and return false', function (done) {

    });
    it('Should match subject aab and pattern a_ and return false', function (done) {

    });
    it('Should match subject aab and pattern a% and return true', function (done) {

    });
    it('Should match subject aab and pattern aa%aa and return false', function (done) {

    });
    it('Should match subject aab and pattern aa__aa and return false', function (done) {

    });
    it('Should match subject aab and pattern __ and return false', function (done) {

    });
    it('Should match subject aab and pattern a__ and return true', function (done) {

    });
    it('Should match subject aab and pattern __a and return false', function (done) {

    });
    it('Should match subject aab and pattern a__b and return false', function (done) {

    });
    it('Should match subject aab and pattern a%b and return true', function (done) {

    });
    it('Should match subject aab and pattern a%b% and return false', function (done) {

    });
    it('Should match subject aab and pattern _a%a_ and return false', function (done) {

    });
    it('Should match subject aab and pattern %b__a and return false', function (done) {

    });
    it('Should match subject aab and pattern %b_a% and return false', function (done) {

    });
});
describe('Matching pattern aabbaa', function() {
    it('Should match subject aabbaa and pattern a_a and return false', function (done) {

    });
    it('Should match subject aabbaa and pattern a%a and return true', function (done) {

    });
    it('Should match subject aabbaa and pattern b_b and return false', function (done) {

    });
    it('Should match subject aabbaa and pattern b%b and return false', function (done) {

    });
    it('Should match subject aabbaa and pattern _a and return false', function (done) {

    });
    it('Should match subject aabbaa and pattern %a and return true', function (done) {

    });
    it('Should match subject aabbaa and pattern a_ and return false', function (done) {

    });
    it('Should match subject aabbaa and pattern a% and return true', function (done) {

    });
    it('Should match subject aabbaa and pattern aa%aa and return true', function (done) {

    });
    it('Should match subject aabbaa and pattern aa__aa and return true', function (done) {

    });
    it('Should match subject aabbaa and pattern __ and return false', function (done) {

    });
    it('Should match subject aabbaa and pattern a__ and return false', function (done) {

    });
    it('Should match subject aabbaa and pattern __a and return false', function (done) {

    });
    it('Should match subject aabbaa and pattern a__b and return false', function (done) {

    });
    it('Should match subject aabbaa and pattern a%b and return false', function (done) {

    });
    it('Should match subject aabbaa and pattern a%b% and return true', function (done) {

    });
    it('Should match subject aabbaa and pattern _a%a_ and return true', function (done) {

    });
    it('Should match subject aabbaa and pattern %b__a and return true', function (done) {

    });
    it('Should match subject aabbaa and pattern %b_a% and return true', function (done) {

    });
});
describe('Matching pattern aabb', function() {
    it('Should match subject aabb and pattern a_a and return false', function (done) {

    });
    it('Should match subject aabb and pattern a%a and return false', function (done) {

    });
    it('Should match subject aabb and pattern b_b and return false', function (done) {

    });
    it('Should match subject aabb and pattern b%b and return false', function (done) {

    });
    it('Should match subject aabb and pattern _a and return false', function (done) {

    });
    it('Should match subject aabb and pattern %a and return false', function (done) {

    });
    it('Should match subject aabb and pattern a_ and return false', function (done) {

    });
    it('Should match subject aabb and pattern a% and return true', function (done) {

    });
    it('Should match subject aabb and pattern aa%aa and return false', function (done) {

    });
    it('Should match subject aabb and pattern aa__aa and return false', function (done) {

    });
    it('Should match subject aabb and pattern __ and return false', function (done) {

    });
    it('Should match subject aabb and pattern a__ and return false', function (done) {

    });
    it('Should match subject aabb and pattern __a and return false', function (done) {

    });
    it('Should match subject aabb and pattern a__b and return true', function (done) {

    });
    it('Should match subject aabb and pattern a%b and return true', function (done) {

    });
    it('Should match subject aabb and pattern a%b% and return true', function (done) {

    });
    it('Should match subject aabb and pattern _a%a_ and return false', function (done) {

    });
    it('Should match subject aabb and pattern %b__a and return false', function (done) {

    });
    it('Should match subject aabb and pattern %b_a% and return false', function (done) {

    });
});
describe('Matching pattern ab', function() {
    it('Should match subject ab and pattern a_a and return false', function (done) {

    });
    it('Should match subject ab and pattern a%a and return false', function (done) {

    });
    it('Should match subject ab and pattern b_b and return false', function (done) {

    });
    it('Should match subject ab and pattern b%b and return false', function (done) {

    });
    it('Should match subject ab and pattern _a and return false', function (done) {

    });
    it('Should match subject ab and pattern %a and return false', function (done) {

    });
    it('Should match subject ab and pattern a_ and return true', function (done) {

    });
    it('Should match subject ab and pattern a% and return true', function (done) {

    });
    it('Should match subject ab and pattern aa%aa and return false', function (done) {

    });
    it('Should match subject ab and pattern __ and return true', function (done) {

    });
    it('Should match subject ab and pattern a__ and return false', function (done) {

    });
    it('Should match subject ab and pattern __a and return false', function (done) {

    });
    it('Should match subject ab and pattern a__b and return false', function (done) {

    });
    it('Should match subject ab and pattern a%b and return false', function (done) {

    });
    it('Should match subject ab and pattern a%b% and return false', function (done) {

    });
    it('Should match subject ab and pattern _a%a_ and return false', function (done) {

    });
    it('Should match subject ab and pattern %b__a and return false', function (done) {

    });
    it('Should match subject ab and pattern %b_a% and return false', function (done) {

    });
});
describe('Getting errors', function(){
    it('Should return error with pattern %%', function(done){

    });
    it('Should return error with pattern _%', function(done){

    });
    it('Should return error with pattern %_', function(done){

    });
    it('Should return error with pattern aa%_%aa', function(done){

    });
    it('Should return error with pattern %%%', function(done){

    });
    it('Should return error with pattern _%_', function(done){

    });
});