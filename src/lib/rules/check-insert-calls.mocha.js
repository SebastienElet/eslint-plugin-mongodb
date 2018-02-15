'use strict';

const RuleTester = require('eslint').RuleTester;
const rule = require('./check-insert-calls');

const ruleTester = new RuleTester();

ruleTester.run('check-insert-calls', rule, {
  valid: [
    "db.collection('users').insertMany([{}, {}, {}]);",
    "mongoClient.db.collection('users').insertOne({}, {});",
    "mongoClient.db.collection('users').insertMany(gen(), {});",
    "mongoClient.db.collection('users').insertOne(ref, {});",
    "mongoClient.db.collection('users').insertMany(gen(), plop, kikoo);",
    "mongoClient.db.collection('users').insertMany([{}], done);",
    "mongoClient.db.collection('users').insertMany([{field: 'value'}], done);",
    "mongoClient.db.collection('users').insertOne(ref, plop, kikoo);",
    "mongoClient.db.collection('users').insertOne(ref, {}, function(){});",
  ],
  invalid: [
    {
      code: "db.collection('users').insertMany();",
      errors: [
        {
          message:
            "Expected db.collection('users').insertMany to have at least 1 argument.",
        },
      ],
    },
    {
      code: "db.collection('users').insertOne();",
      errors: [
        {
          message:
            "Expected db.collection('users').insertOne to have at least 1 argument.",
        },
      ],
    },
    {
      code: "mongoClient.db.collection('users').insertOne('test', {});",
      errors: [
        {
          message:
            "Expected mongoClient.db.collection('users').insertOne call first argument value to be an object.",
        },
      ],
    },
    {
      code: "mongoClient.db.collection('users').insertMany('test', {});",
      errors: [
        {
          message:
            "Expected mongoClient.db.collection('users').insertMany call first argument value to be an array.",
        },
      ],
    },
    {
      code: "mongoClient.db.collection('users').insertOne([{}], 'test');",
      errors: [
        {
          message:
            "Expected mongoClient.db.collection('users').insertOne call second argument value to be an object or a callback function.",
        },
      ],
    },
    {
      code:
        "mongoClient.db.collection('users').insertOne({}, {}, function() {}, {});",
      errors: [
        {
          message:
            "Expected mongoClient.db.collection('users').insertOne call to have maximum 3 arguments.",
        },
      ],
    },
    {
      code: "mongoClient.db.collection('users').insertOne({}, {}, 'test');",
      errors: [
        {
          message:
            "Expected mongoClient.db.collection('users').insertOne call third argument value to be a callback function.",
        },
      ],
    },
    {
      code: "mongoClient.db.collection('users').insertMany([{}], 'test');",
      errors: [
        {
          message:
            "Expected mongoClient.db.collection('users').insertMany call second argument value to be an object or a callback function.",
        },
      ],
    },
    {
      code: "mongoClient.db.collection('users').insertMany([{}], {}, 'test');",
      errors: [
        {
          message:
            "Expected mongoClient.db.collection('users').insertMany call third argument value to be a callback function.",
        },
      ],
    },
    {
      code:
        "mongoClient.db.collection('users').insertMany([{}], {}, function() {}, {});",
      errors: [
        {
          message:
            "Expected mongoClient.db.collection('users').insertMany call to have maximum 3 arguments.",
        },
      ],
    },
  ],
});
