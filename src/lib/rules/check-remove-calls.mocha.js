'use strict';

var linter = require('eslint').linter;
var RuleTester = require('eslint').RuleTester;
var rule = require('./check-remove-calls');

var ruleTester = new RuleTester(linter);

ruleTester.run('check-remove-calls', rule, {
  valid: [
    "db.collection('users').deleteOne({_id: plop});",
    "mongoClient.db.collection('users').deleteMany({}, { limit: 10 });",
    "mongoClient.db.collection('users').remove(gen(), {});",
    "mongoClient.db.collection('users').delete(ref, {});",
  ],
  invalid: [{
    code: "db.collection('users').deleteOne();",
    errors: [{
      message: 'Expected db.collection(\'users\').deleteOne to have at least 1 argument.',
    }],
  }, {
    code: "mongoClient.db.collection('users').deleteMany('test', {});",
    errors: [{
      message: 'Expected mongoClient.db.collection(\'users\').deleteMany call first argument value to be an object.',
    }],
  }, {
    code: "mongoClient.db.collection('users').deleteOne({}, 'test');",
    errors: [{
      message: 'Expected mongoClient.db.collection(\'users\').deleteOne call second argument value to be an object.',
    }],
  }],
});
