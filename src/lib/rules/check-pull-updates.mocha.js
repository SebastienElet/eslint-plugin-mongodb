'use strict';

var RuleTester = require('eslint').RuleTester;
var rule = require('./check-pull-updates');

var ruleTester = new RuleTester();

ruleTester.run('check-pull-updates', rule, {
  valid: [
    "db.collection('users').updateMany({}, { $pull: { qty: 1, schmilbick: plop, truc: false } });",
    "db.collection('users').updateOne({}, { $pull: { qty: { schmilbick: plop, truc: false } } });",
  ],
  invalid: [{
    code: "db.collection('users').updateMany({}, { $pull: 'test' });",
    errors: [{
      message: 'Expected $pull operator value to be an object.',
    }],
  }],
});
