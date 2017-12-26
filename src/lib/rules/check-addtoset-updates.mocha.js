'use strict';

const RuleTester = require('eslint').RuleTester;
const rule = require('./check-addtoset-updates');

const ruleTester = new RuleTester();

ruleTester.run('check-addtoset-updates', rule, {
  valid: [
    "db.collection('users').updateMany({}, { $addToSet: { qty: 1, schmilbick: plop, truc: false } });",
    "db.collection('users').updateMany({}, { $addToSet: { tags: { $each: ['plop', 'lol'] } } });",
  ],
  invalid: [
    {
      code: "db.collection('users').updateMany({}, { $addToSet: 'test' });",
      errors: [
        {
          message: 'Expected $addToSet operator value to be an object.',
        },
      ],
    },
    {
      code:
        "db.collection('users').updateMany({}, { $addToSet: { t: ['test', 'plop'] } });",
      errors: [
        {
          message:
            'Adding an array with $addToSet adds the array, use the $each' +
            ' modifier to add each elements (key: t).',
        },
      ],
    },
    {
      code:
        "db.collection('users').updateMany({}, { $addToSet: { $each: 'test' } });",
      errors: [
        {
          message: 'Expected $each modifier value to be an array.',
        },
      ],
    },
  ],
});
