'use strict';

const RuleTester = require('eslint').RuleTester;
const rule = require('./check-update-calls');

const ruleTester = new RuleTester();

ruleTester.run('check-update-calls', rule, {
  valid: [
    "db.collection('users').updateMany({}, { $rename: { qty: 'quantity' } });",
    "mongoClient.db.collection('users').updateOne({}, { $rename: { qty: newName } }, {});",
    "mongoClient.db.collection('users').updateMany(gen(), {}, {});",
    "mongoClient.db.collection('users').updateOne(ref, {}, {});",
    "mongoClient.db.collection('users').updateMany(gen(), gen(), gen());",
    "mongoClient.db.collection('users').updateOne(ref, ref, ref);",
  ],
  invalid: [
    {
      code: "db.collection('users').updateMany();",
      errors: [
        {
          message:
            "Expected db.collection('users').updateMany to have at least 2 arguments.",
        },
      ],
    },
    {
      code: "db.collection('users').updateOne({});",
      errors: [
        {
          message:
            "Expected db.collection('users').updateOne to have at least 2 arguments.",
        },
      ],
    },
    {
      code: "mongoClient.db.collection('users').updateOne('test', {});",
      errors: [
        {
          message:
            "Expected mongoClient.db.collection('users').updateOne call first argument value to be an object.",
        },
      ],
    },
    {
      code: "mongoClient.db.collection('users').updateMany({}, 'test');",
      errors: [
        {
          message:
            "Expected mongoClient.db.collection('users').updateMany call second argument value to be an object.",
        },
      ],
    },
    {
      code: "mongoClient.db.collection('users').updateOne({}, {}, 'test');",
      errors: [
        {
          message:
            "Expected mongoClient.db.collection('users').updateOne call third argument value to be an object or a callback function.",
        },
      ],
    },
    {
      code:
        "mongoClient.db.collection('users').updateOne({}, {}, function() {}, {});",
      errors: [
        {
          message:
            "Expected mongoClient.db.collection('users').updateOne call fourth argument value to be a callback function.",
        },
      ],
    },
    {
      code:
        "mongoClient.db.collection('users').updateOne({}, {}, {}, function() {}, function() {});",
      errors: [
        {
          message:
            "Expected mongoClient.db.collection('users').updateOne call to have maximum 4 arguments.",
        },
      ],
    },
  ],
});
