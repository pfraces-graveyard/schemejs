'use strict';

var env = require('./env');

var bool = function (expr) {
  return expr ? '#t' : '#f';
};

var isTrue = function (expr) {
  return expr === '#t' ? true : false;
};

var evalScheme = function (expr, scope) {
  scope = scope || env.root();

  /**
   * atoms
   * -----
   */

  if (typeof expr === 'number') {
    return expr;
  }

  if (typeof expr === 'string') {
    return env.lookup(scope, expr);
  }

  /**
   * lists
   * -----
   */

  if (expr[0] === 'quote') {
  return expr[1];
  }

  if (expr[0] === 'begin') {
    return expr.slice(1).reduce(function (acc, arg) {
      return evalScheme(arg, scope);
    }, 0);
  }

  if (expr[0] === 'define') {
    env.create(scope, expr[1], evalScheme(expr[2], scope));
    return;
  }

  if (expr[0] === 'set!') {
    return env.update(scope, expr[1], evalScheme(expr[2], scope));
  }

  if (expr[0] === 'let') {
    var bindings = expr.slice(1, -1);
    var body = expr[expr.length - 1];
    var inner = env.inner(scope);

    inner.bindings = bindings.reduce(function (acc, binding) {
      var key = binding[0];
      var value = evalScheme(binding[1], scope);
      acc[key] = value;
      return acc;
    }, {});

    return evalScheme(body, inner);
  }

  if (expr[0] === 'if') {
    return isTrue(evalScheme(expr[1], scope))
      ? evalScheme(expr[2], scope)
      : evalScheme(expr[3], scope);
  }

  if (expr[0] === 'lambda') {
    var vars = expr[1];
    var body = expr[2];
    var inner = env.inner(scope);

    return function () {
      var args = [].slice.call(arguments);

      inner.bindings = args.reduce(function (acc, arg, index) {
        acc[vars[index]] = arg;
        return acc;
      }, {});

      return evalScheme(body, inner);
    };
  }

  /**
   * ### default
   *
   * function application
   */

  var fn = evalScheme(expr[0], scope);

  var args = expr.slice(1).map(function (arg) {
    return evalScheme(arg, scope);
  });

  return fn.apply(null, args);
};

module.exports = {
  eval: evalScheme
};
