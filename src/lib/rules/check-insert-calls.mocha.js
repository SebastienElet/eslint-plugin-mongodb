'use strict';

var linter = require('eslint').linter;
var RuleTester = require('eslint').RuleTester;
var rule = require('./check-insert-calls');

var ruleTester = new RuleTester(linter);

ruleTester.run('check-insert-calls', rule, {
  valid: [
    "db.collection('users').insertMany([{}, {}, {}]);",
    "mongoClient.db.collection('users').insertOne({}, { $rename: { qty: newName } }, {});",
    "mongoClient.db.collection('users').insertMany(gen(), {});",
    "mongoClient.db.collection('users').insertOne(ref, {});",
  ],
  invalid: [{
    code: "db.collection('users').insertMany();",
    errors: [{
      message: 'Expected db.collection(\'users\').insertMany to have at least 1 argument.',
    }],
  }, {
    code: "db.collection('users').insertOne();",
    errors: [{
      message: 'Expected db.collection(\'users\').insertOne to have at least 1 argument.',
    }],
  }, {
    code: "mongoClient.db.collection('users').insertOne('test', {});",
    errors: [{
      message: 'Expected mongoClient.db.collection(\'users\').insertOne call first argument value to be an object.',
    }],
  }, {
    code: "mongoClient.db.collection('users').insertMany('test', {});",
    errors: [{
      message: 'Expected mongoClient.db.collection(\'users\').insertMany call first argument value to be an array.',
    }],
  }, {
    code: "mongoClient.db.collection('users').insertOne([{}], 'test');",
    errors: [{
      message: 'Expected mongoClient.db.collection(\'users\').insertOne call second argument value to be an object.',
    }],
  }, {
    code: "mongoClient.db.collection('users').insertMany([{}], 'test');",
    errors: [{
      message: 'Expected mongoClient.db.collection(\'users\').insertMany call second argument value to be an object.',
    }],
  }],
});
