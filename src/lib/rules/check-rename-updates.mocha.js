'use strict';

var linter = require('eslint').linter;
var RuleTester = require('eslint').RuleTester;
var rule = require('./check-rename-updates');

var ruleTester = new RuleTester(linter);

ruleTester.run('check-rename-updates', rule, {
  valid: [
    "db.collection('users').update({}, { $rename: { qty: 'quantity' } });",
    "mongoClient.db.collection('users').update({}, { $rename: { qty: newName } });", // Computed
    "mongoClient.db.collection('users').update({}, { $rename: { qty: 'quantity', qty2: newName, } });", // Mix
  ],
  invalid: [{
    code: "db.collection('users').update({}, { $rename: 'test' });",
    errors: [{
      message: 'Expected $rename operator value to be an object.',
    }],
  }, {
    code: "mongoClient.db.collection('users').update({}, { $rename: { test: 1664 } });",
    errors: [{
      message: '$rename operator require strings (key: test).',
    }],
  }],
});
