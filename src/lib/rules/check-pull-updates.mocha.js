'use strict';

const RuleTester = require('eslint').RuleTester;
const rule = require('./check-pull-updates');

const ruleTester = new RuleTester();

ruleTester.run('check-pull-updates', rule, {
  valid: [
    "db.collection('users').updateMany({}, { $pull: { qty: 1, schmilbick: plop, truc: false } });",
    "db.collection('users').updateOne({}, { $pull: { qty: { schmilbick: plop, truc: false } } });",
  ],
  invalid: [
    {
      code: "db.collection('users').updateMany({}, { $pull: 'test' });",
      errors: [
        {
          message: 'Expected $pull operator value to be an object.',
        },
      ],
    },
  ],
});
