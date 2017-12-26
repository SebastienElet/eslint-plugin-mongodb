'use strict';

const RuleTester = require('eslint').RuleTester;
const rule = require('./check-current-date-updates');

const ruleTester = new RuleTester();

ruleTester.run('check-current-date-updates', rule, {
  valid: [
    {
      code: 'userCollection.updateMany({}, { $currentDate: true });',
      settings: {
        mongodb: {
          callPatterns: {
            update: [
              '^(user|place|session)Collection\\.(update|findAndModify)$',
            ],
          },
        },
      },
    },
    "mongoClient.db.collection('users').updateMany({}, { $currentDate: { $type: 'timestamp' } });",
    "mongoClient.db.collection('users').updateMany({}, { $currentDate: { $type: 'date' } });",
    "mongoClient.db.collection('users').updateMany({}, { $currentDate: !mybool });",
  ],
  invalid: [
    {
      code: "userCollection.updateMany({}, { $currentDate: 'true' });",
      settings: {
        mongodb: {
          callPatterns: {
            update: [
              '^(user|place|session)Collection\\.(updateMany|updateOne)$',
            ],
          },
        },
      },
      errors: [
        {
          message:
            'Expected $currentDate operator value to be a boolean or an object.',
        },
      ],
    },
    {
      code:
        "mongoClient.db.collection('users').updateMany({}, { $currentDate: { $type: 'date',  type: '1664' } });",
      errors: [
        {
          message:
            '$currentDate operator should only have a $type modifier (found: type).',
        },
      ],
    },
    {
      code:
        "mongoClient.db.collection('users').updateMany({}, { $currentDate: { $type: '1664' } });",
      errors: [
        {
          message:
            '$currentDate operator $type modifier value can be only "date" or "timestamp" (got: 1664).',
        },
      ],
    },
  ],
});
