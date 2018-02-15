'use strict';

const RuleTester = require('eslint').RuleTester;
const rule = require('./check-numeric-updates');

const ruleTester = new RuleTester();

ruleTester.run('check-numeric-updates', rule, {
  valid: [
    "db.collection('users').updateMany({}, { $inc: { qty: -1664.1664 }});",
    "mongoClient.db.collection('users').updateMany({}, { $mul: { qty: 33 }});",
    "mongoClient.db.collection('users').updateMany({}, { $mul: { test: plop }});", // Computed :(
    "mongoClient.db.collection('users').updateMany({}, { $mul: { qty: 33 * 33 }});", // Computed
  ],
  invalid: [
    {
      code: "db.collection('users').updateMany({}, { $mul: 'test' });",
      errors: [
        {
          message: 'Expected $mul operator value to be an object.',
        },
      ],
    },
    {
      code:
        "mongoClient.db.collection('users').updateMany({}, { $inc: {test: 'test'}});",
      errors: [
        {
          message: '$inc operator require numbers (key: test).',
        },
      ],
    },
  ],
});
