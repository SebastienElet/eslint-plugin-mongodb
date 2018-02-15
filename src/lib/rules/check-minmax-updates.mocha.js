'use strict';

const RuleTester = require('eslint').RuleTester;
const rule = require('./check-minmax-updates');

const ruleTester = new RuleTester();

ruleTester.run('check-minmax-updates', rule, {
  valid: [
    "db.collection('users').updateMany({}, { $min: { old: 18 }});",
    "mongoClient.db.collection('users').updateMany({}, { $max: { old: 33 }});",
    "mongoClient.db.collection('users').updateMany({}, { $max: { test: plop }});", // Computed :(
    "mongoClient.db.collection('users').updateMany({}, { $min: { qty: 33 * 33 }});", // Computed
  ],
  invalid: [
    {
      code: "db.collection('users').updateMany({}, { $min: 'test' });",
      errors: [
        {
          message: 'Expected $min operator value to be an object.',
        },
      ],
    },
    {
      code:
        "mongoClient.db.collection('users').updateMany({}, { $max: {test: 'test'}});",
      errors: [
        {
          message: '$max operator require numbers (key: test).',
        },
      ],
    },
  ],
});
