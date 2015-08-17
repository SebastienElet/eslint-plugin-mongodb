'use strict';

var linter = require('eslint').linter;
var ESLintTester = require('eslint-tester');
var eslintTester = new ESLintTester(linter);

eslintTester.addRuleTest('src/lib/rules/no-replace', {
  valid: [
    "db.collection('users').update({}, { $set: { name: 'test' }});",
    "mongoClient.db.collection('users').update({}, { $set: { name: 'test' }});",
  ],
  invalid: [{
    code: "db.collection('users').update({}, { name: 'test' });",
    errors: [{
      message: 'Raw update of a complete collection entry.',
    }],
  }, {
    code: "db.collection('users').update({}, {});",
    errors: [{
      message: 'Update query with an empty object.',
    }],
  }, {
    code: "db.collection('users').update({});",
    errors: [{
      message: 'Update query is missing second argument.',
    }],
  }],
});
