'use strict';

var linter = require('eslint').linter;
var RuleTester = require('eslint').RuleTester;
var rule = require('./check-unset-updates');

var ruleTester = new RuleTester(linter);

ruleTester.run('check-unset-updates', rule, {
  valid: [
    "db.collection('users').updateMany({}, { $unset: { qty: '', schmilbick: '' } });",
  ],
  invalid: [{
    code: "db.collection('users').updateMany({}, { $unset: 'test' });",
    errors: [{
      message: 'Expected $unset operator value to be an object.',
    }],
  }, {
    code: "mongoClient.db.collection('users').updateMany({}, { $unset: { qty: newName } });",
    errors: [{
      message: '$unset operator require deleted keys to be set to empty strings (key: qty).',
    }],
  }, {
    code: "mongoClient.db.collection('users').updateMany({}, { $unset: { test: 1664 } });",
    errors: [{
      message: '$unset operator require deleted keys to be set to empty strings (key: test).',
    }],
  }],
});
