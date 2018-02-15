'use strict';

const RuleTester = require('eslint').RuleTester;
const rule = require('./check-set-updates');

const ruleTester = new RuleTester();

ruleTester.run('check-set-updates', rule, {
  valid: [
    "db.collection('users').updateMany({}, { $set: { qty: '', schmilbick: plop, truc: false } });",
    "db.collection('users').updateMany({}, { $setOnInsert: { qty: { schmilbick: plop, truc: false } } });",
  ],
  invalid: [
    {
      code: "db.collection('users').updateMany({}, { $set: 'test' });",
      errors: [
        {
          message: 'Expected $set operator value to be an object.',
        },
      ],
    },
  ],
});
