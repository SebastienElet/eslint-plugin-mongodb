'use strict';

var linter = require('eslint').linter;
var RuleTester = require('eslint').RuleTester;
var rule = require('./check-minmax-updates');

var ruleTester = new RuleTester(linter);

ruleTester.run('check-minmax-updates', rule, {
  valid: [
    "db.collection('users').update({}, { $min: { old: 18 }});",
    "mongoClient.db.collection('users').update({}, { $max: { old: 33 }});",
    "mongoClient.db.collection('users').update({}, { $max: { test: plop }});", // Computed :(
    "mongoClient.db.collection('users').update({}, { $min: { qty: 33 * 33 }});", // Computed
  ],
  invalid: [{
    code: "db.collection('users').update({}, { $min: 'test' });",
    errors: [{
      message: 'Expected $min operator value to be an object.',
    }],
  }, {
    code: "mongoClient.db.collection('users').update({}, { $max: {test: 'test'}});",
    errors: [{
      message: '$max operator require numbers (key: test).',
    }],
  }],
});
