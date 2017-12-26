'use strict';

const RuleTester = require('eslint').RuleTester;
const rule = require('./check-push-updates');

const ruleTester = new RuleTester();

ruleTester.run('check-push-updates', rule, {
  valid: [
    "db.collection('users').updateMany({}, { $push: { tags: 'hype' }, $position: 2 });",
    "db.collection('users').updateMany({}, { $push: { tags: { $each: ['hype', 'eslint'] } } });",
  ],
  invalid: [
    {
      code: "db.collection('users').updateMany({}, { $push: 'test' });",
      errors: [
        {
          message: 'Expected $push operator value to be an object.',
        },
      ],
    },
    {
      code:
        "db.collection('users').updateMany({}, { $push: { tags: { $each: ['hype'], $slice: 'aa' } } });",
      errors: [
        {
          message: 'Expected $slice modifier value to be a number.',
        },
      ],
    },
    {
      code:
        "db.collection('users').updateMany({}, { $push: { tags: { $each: ['hype'], $position: 'aa' } } });",
      errors: [
        {
          message: 'Expected $position modifier value to be a number.',
        },
      ],
    },
  ],
});
