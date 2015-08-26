'use strict';

var linter = require('eslint').linter;
var RuleTester = require('eslint').RuleTester;
var rule = require('./no-replace');

var ruleTester = new RuleTester(linter);

ruleTester.run('no-replace', rule, {
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
