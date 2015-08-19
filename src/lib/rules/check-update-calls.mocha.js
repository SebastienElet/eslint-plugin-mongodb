'use strict';

var linter = require('eslint').linter;
var ESLintTester = require('eslint-tester');
var eslintTester = new ESLintTester(linter);

eslintTester.addRuleTest('src/lib/rules/check-update-calls', {
  valid: [
    "db.collection('users').update({}, { $rename: { qty: 'quantity' } });",
    "mongoClient.db.collection('users').update({}, { $rename: { qty: newName } }, {});",
    "mongoClient.db.collection('users').update(gen(), {}, {});",
    "mongoClient.db.collection('users').update(ref, {}, {});",
  ],
  invalid: [{
    code: "db.collection('users').update();",
    errors: [{
      message: 'Expected db.collection(\'users\').update to have at least 2 arguments.',
    }],
  }, {
    code: "db.collection('users').update({});",
    errors: [{
      message: 'Expected db.collection(\'users\').update to have at least 2 arguments.',
    }],
  }, {
    code: "mongoClient.db.collection('users').update('test', {});",
    errors: [{
      message: 'Expected mongoClient.db.collection(\'users\').update call first argument value to be an object.',
    }],
  }, {
    code: "mongoClient.db.collection('users').update({}, 'test');",
    errors: [{
      message: 'Expected mongoClient.db.collection(\'users\').update call second argument value to be an object.',
    }],
  }, {
    code: "mongoClient.db.collection('users').update({}, {}, 'test');",
    errors: [{
      message: 'Expected mongoClient.db.collection(\'users\').update call third argument value to be an object.',
    }],
  }],
});
