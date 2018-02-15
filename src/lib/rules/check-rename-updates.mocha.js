'use strict';

const RuleTester = require('eslint').RuleTester;
const rule = require('./check-rename-updates');

const ruleTester = new RuleTester();

ruleTester.run('check-rename-updates', rule, {
  valid: [
    "db.collection('users').updateMany({}, { $rename: { qty: 'quantity' } });",
    "mongoClient.db.collection('users').updateMany({}, { $rename: { qty: newName } });", // Computed
    "mongoClient.db.collection('users').updateMany({}, { $rename: { qty: 'quantity', qty2: newName, } });", // Mix
  ],
  invalid: [
    {
      code: "db.collection('users').updateMany({}, { $rename: 'test' });",
      errors: [
        {
          message: 'Expected $rename operator value to be an object.',
        },
      ],
    },
    {
      code:
        "mongoClient.db.collection('users').updateMany({}, { $rename: { test: 1664 } });",
      errors: [
        {
          message: '$rename operator require strings (key: test).',
        },
      ],
    },
  ],
});
