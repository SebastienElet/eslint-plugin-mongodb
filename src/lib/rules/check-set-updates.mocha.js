'use strict';

var linter = require('eslint').linter;
var RuleTester = require('eslint').RuleTester;
var rule = require('./check-set-updates');

var ruleTester = new RuleTester(linter);

ruleTester.run('check-set-updates', rule, {
  valid: [
    "db.collection('users').updateMany({}, { $set: { qty: '', schmilbick: plop, truc: false } });",
    "db.collection('users').updateMany({}, { $setOnInsert: { qty: { schmilbick: plop, truc: false } } });",
  ],
  invalid: [{
    code: "db.collection('users').updateMany({}, { $set: 'test' });",
    errors: [{
      message: 'Expected $set operator value to be an object.',
    }],
  }],
});
