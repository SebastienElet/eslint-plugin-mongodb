'use strict';

var linter = require('eslint').linter;
var ESLintTester = require('eslint-tester');
var eslintTester = new ESLintTester(linter);

eslintTester.addRuleTest('src/lib/rules/check-unset-updates', {
  valid: [
    "db.collection('users').update({}, { $unset: { qty: '', schmilbick: '' } });",
  ],
  invalid: [{
    code: "db.collection('users').update({}, { $unset: 'test' });",
    errors: [{
      message: 'Expected $unset operator value to be an object.',
    }],
  }, {
    code: "mongoClient.db.collection('users').update({}, { $unset: { qty: newName } });",
    errors: [{
      message: '$unset operator require deleted keys to be set to empty strings (key: qty).',
    }],
  }, {
    code: "mongoClient.db.collection('users').update({}, { $unset: { test: 1664 } });",
    errors: [{
      message: '$unset operator require deleted keys to be set to empty strings (key: test).',
    }],
  }],
});
