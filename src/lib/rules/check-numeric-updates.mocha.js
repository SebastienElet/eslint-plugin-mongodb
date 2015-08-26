'use strict';

var linter = require('eslint').linter;
var RuleTester = require('eslint').RuleTester;
var rule = require('./check-numeric-updates');

var ruleTester = new RuleTester(linter);

ruleTester.run('check-numeric-updates', rule, {
  valid: [
    "db.collection('users').update({}, { $inc: { qty: -1664.1664 }});",
    "mongoClient.db.collection('users').update({}, { $mul: { qty: 33 }});",
    "mongoClient.db.collection('users').update({}, { $mul: { test: plop }});", // Computed :(
    "mongoClient.db.collection('users').update({}, { $mul: { qty: 33 * 33 }});", // Computed
  ],
  invalid: [{
    code: "db.collection('users').update({}, { $mul: 'test' });",
    errors: [{
      message: 'Expected $mul operator value to be an object.',
    }],
  }, {
    code: "mongoClient.db.collection('users').update({}, { $inc: {test: 'test'}});",
    errors: [{
      message: '$inc operator require numbers (key: test).',
    }],
  }],
});
