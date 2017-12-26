'use strict';

const RuleTester = require('eslint').RuleTester;
const rule = require('./check-pop-updates');

const ruleTester = new RuleTester();

ruleTester.run('check-pop-updates', rule, {
  valid: [
    "db.collection('users').updateMany({}, { $pop: { tags: 3 }});",
    "mongoClient.db.collection('users').updateMany({}, { $pop: { qty: 1 * 2 }});",
    "mongoClient.db.collection('users').updateOne({}, { $pop: { test: plop }});",
    "mongoClient.db.collection('users').updateMany({}, { $pop: { qty: getIndex() }});",
  ],
  invalid: [
    {
      code: "db.collection('users').updateMany({}, { $pop: 'test' });",
      errors: [
        {
          message: 'Expected $pop operator value to be an object.',
        },
      ],
    },
    {
      code:
        "mongoClient.db.collection('users').updateMany({}, { $pop: { tags: 'test' }});",
      errors: [
        {
          message: '$pop operator require numbers (key: tags).',
        },
      ],
    },
  ],
});
