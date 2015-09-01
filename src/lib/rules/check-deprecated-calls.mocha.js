'use strict';

var linter = require('eslint').linter;
var RuleTester = require('eslint').RuleTester;
var rule = require('./check-deprecated-calls');

var ruleTester = new RuleTester(linter);

ruleTester.run('check-deprecated-calls', rule, {
  valid: [
    "db.collection('users').findOne({_id: plop});",
    "mongoClient.db.collection('users').findMany({});",
    "mongoClient.db.collection('users').deleteOne(gen());",
    "mongoClient.db.collection('users').insertOne({});",
  ],
  invalid: [{
    code: "db.collection('users').findAndModify();",
    errors: [{
      message: 'findAndModify method is deprecated.',
    }],
  }, {
    code: "mongoClient.db.collection('users').update('test', {});",
    errors: [{
      message: 'update method is deprecated.',
    }],
  }, {
    code: "mongoClient.db.collection('users').remove([{}]);",
    errors: [{
      message: 'remove method is deprecated.',
    }],
  }],
});
