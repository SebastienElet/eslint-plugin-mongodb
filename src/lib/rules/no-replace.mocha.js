'use strict';

const RuleTester = require('eslint').RuleTester;
const rule = require('./no-replace');

const ruleTester = new RuleTester();

ruleTester.run('no-replace', rule, {
  valid: [
    "db.collection('users').updateMany({}, { $set: { name: 'test' }});",
    "mongoClient.db.collection('users').update({}, { $set: { name: 'test' }});",
    "db.collection('users').updateMany({}, {});",
    "db.collection('users').updateMany({}, hey);",
    "db.collection('users').updateMany({});",
  ],
  invalid: [
    {
      code: "db.collection('users').updateMany({}, { name: 'test' });",
      errors: [
        {
          message: 'Raw update of a complete collection entry.',
        },
      ],
    },
  ],
});
