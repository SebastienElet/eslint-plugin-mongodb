'use strict';

var linter = require('eslint').linter;
var ESLintTester = require('eslint-tester');
var eslintTester = new ESLintTester(linter);

eslintTester.addRuleTest('src/lib/rules/no-replace', {
  valid: [
    "db.collection('users').update({}, { $set: { name: 'test' }});",
    "mongoClient.db.collection('users').update({}, { $set: { name: 'test' }});",
    "db.collection('users').update({}, {});",
    "db.collection('users').update({});",
  ],
  invalid: [{
    code: "db.collection('users').update({}, { name: 'test' });",
    errors: [{
      message: 'Raw update of a complete collection entry.',
    }],
  }],
});
