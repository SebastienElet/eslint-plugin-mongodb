'use strict';

const RuleTester = require('eslint').RuleTester;
const rule = require('./check-deprecated-updates');

const ruleTester = new RuleTester();

ruleTester.run('check-deprecated-updates', rule, {
  valid: [],
  invalid: [
    {
      code: "db.collection('users').updateMany({}, { $pushAll: ['test'] });",
      errors: [
        {
          message:
            'The $pushAll operator is deprecated, use the $push one with the $each modifier.',
        },
      ],
    },
    {
      code: "db.collection('users').updateMany({}, { $pullAll: ['test'] });",
      errors: [
        {
          message: 'The $pullAll operator is deprecated, use the $pull one.',
        },
      ],
    },
  ],
});
