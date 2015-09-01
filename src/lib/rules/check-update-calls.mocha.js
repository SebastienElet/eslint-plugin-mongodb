'use strict';

var linter = require('eslint').linter;
var RuleTester = require('eslint').RuleTester;
var rule = require('./check-update-calls');

var ruleTester = new RuleTester(linter);

ruleTester.run('check-update-calls', rule, {
  valid: [
    "db.collection('users').updateMany({}, { $rename: { qty: 'quantity' } });",
    "mongoClient.db.collection('users').updateOne({}, { $rename: { qty: newName } }, {});",
    "mongoClient.db.collection('users').updateMany(gen(), {}, {});",
    "mongoClient.db.collection('users').updateOne(ref, {}, {});",
  ],
  invalid: [{
    code: "db.collection('users').updateMany();",
    errors: [{
      message: 'Expected db.collection(\'users\').updateMany to have at least 2 arguments.',
    }],
  }, {
    code: "db.collection('users').updateOne({});",
    errors: [{
      message: 'Expected db.collection(\'users\').updateOne to have at least 2 arguments.',
    }],
  }, {
    code: "mongoClient.db.collection('users').updateOne('test', {});",
    errors: [{
      message: 'Expected mongoClient.db.collection(\'users\').updateOne call first argument value to be an object.',
    }],
  }, {
    code: "mongoClient.db.collection('users').updateMany({}, 'test');",
    errors: [{
      message: 'Expected mongoClient.db.collection(\'users\').updateMany call second argument value to be an object.',
    }],
  }, {
    code: "mongoClient.db.collection('users').updateOne({}, {}, 'test');",
    errors: [{
      message: 'Expected mongoClient.db.collection(\'users\').updateOne call third argument value to be an object.',
    }],
  }],
});
