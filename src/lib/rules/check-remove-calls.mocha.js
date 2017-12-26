'use strict';

const RuleTester = require('eslint').RuleTester;
const rule = require('./check-remove-calls');

const ruleTester = new RuleTester();

ruleTester.run('check-remove-calls', rule, {
  valid: [
    "db.collection('users').deleteOne({_id: plop});",
    "mongoClient.db.collection('users').deleteMany({}, { limit: 10 });",
    "mongoClient.db.collection('users').deleteMany(gen(), {});",
    "mongoClient.db.collection('users').deleteOne(ref, {});",
    "mongoClient.db.collection('users').deleteOne(ref, ref, ref);",
    "mongoClient.db.collection('users').deleteOne(ref, function() {});",
    "mongoClient.db.collection('users').deleteOne(ref, {}, function() {});",
  ],
  invalid: [
    {
      code: "db.collection('users').deleteOne();",
      errors: [
        {
          message:
            "Expected db.collection('users').deleteOne to have at least 1 argument.",
        },
      ],
    },
    {
      code: "mongoClient.db.collection('users').deleteMany('test', {});",
      errors: [
        {
          message:
            "Expected mongoClient.db.collection('users').deleteMany call first argument value to be an object.",
        },
      ],
    },
    {
      code: "mongoClient.db.collection('users').deleteOne({}, 'test');",
      errors: [
        {
          message:
            "Expected mongoClient.db.collection('users').deleteOne call second argument value to be an object or a callback function.",
        },
      ],
    },
    {
      code: "mongoClient.db.collection('users').deleteOne({}, {}, 'test');",
      errors: [
        {
          message:
            "Expected mongoClient.db.collection('users').deleteOne call third argument value to be a callback function.",
        },
      ],
    },
    {
      code:
        "mongoClient.db.collection('users').deleteOne({}, {}, function() {}, {});",
      errors: [
        {
          message:
            "Expected mongoClient.db.collection('users').deleteOne call to have maximum 3 arguments.",
        },
      ],
    },
  ],
});
