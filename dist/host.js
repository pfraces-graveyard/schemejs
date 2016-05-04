'use strict';

/**
 * ### arithmetic operators
 */

var sum = function (a, b) {
  return a + b;
};

var substract = function (a, b) {
  return a - b;
};

var multiply = function (a, b) {
  return a * b;
};

var divide = function (a, b) {
  return a / b;
};

/**
 * ### boolean operators (a.k.a. predicates)
 */

var equals = function (a, b) {
  return a === b;
};

var lessThan = function (a, b) {
  return a < b;
};

var greaterThan = function (a, b) {
  return a > b;
};

/**
 * ### list operators
 */

var cons = function (atom, list) {
    return [atom].concat(list);
};

var car = function (list) {
  return list[0];
};

var cdr = function (list) {
  return list.slice(1);
};

/**
 * ### expose api
 */

module.exports = {
  '+': sum,
  '-': substract,
  '*': multiply,
  '/': divide,
  '=': equals,
  '<': lessThan,
  '>': greaterThan,
  cons: cons,
  car: car,
  cdr: cdr
};
