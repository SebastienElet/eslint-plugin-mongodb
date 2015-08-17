'use strict';

var linter = require('eslint').linter;
var ESLintTester = require('eslint-tester');
var eslintTester = new ESLintTester(linter);

eslintTester.addRuleTest('src/lib/rules/check-numeric-updates', {
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
