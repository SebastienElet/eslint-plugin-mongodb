'use strict';

const RuleTester = require('eslint').RuleTester;
const rule = require('./check-query-calls');

const ruleTester = new RuleTester();

ruleTester.run('check-query-calls', rule, {
  valid: [
    "db.collection('users').find({_id: plop});",
    "mongoClient.db.collection('users').find({}, { limit: 10 });",
    "mongoClient.db.collection('users').findOne(gen(), {});",
    "mongoClient.db.collection('users').find(ref, {});",
    "mongoClient.db.collection('users').find(ref, ref, ref);",
    "mongoClient.db.collection('users').find(ref, function() {});",
    "mongoClient.db.collection('users').find(ref, {}, function() {});",
  ],
  invalid: [
    {
      code: "db.collection('users').find();",
      errors: [
        {
          message:
            "Expected db.collection('users').find to have at least 1 argument.",
        },
      ],
    },
    {
      code: "mongoClient.db.collection('users').find('test', {});",
      errors: [
        {
          message:
            "Expected mongoClient.db.collection('users').find call first argument value to be an object.",
        },
      ],
    },
    {
      code: "mongoClient.db.collection('users').find({}, 'test');",
      errors: [
        {
          message:
            "Expected mongoClient.db.collection('users').find call second argument value to be an object or a callback function.",
        },
      ],
    },
    {
      code: "mongoClient.db.collection('users').find({}, {}, 'test');",
      errors: [
        {
          message:
            "Expected mongoClient.db.collection('users').find call third argument value to be a callback function.",
        },
      ],
    },
    {
      code:
        "mongoClient.db.collection('users').find({}, {}, function() {}, {});",
      errors: [
        {
          message:
            "Expected mongoClient.db.collection('users').find call to have maximum 3 arguments.",
        },
      ],
    },
  ],
});
