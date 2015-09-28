'use strict';

var linter = require('eslint').linter;
var RuleTester = require('eslint').RuleTester;
var rule = require('./check-deprecated-updates');

var ruleTester = new RuleTester(linter);

ruleTester.run('check-deprecated-updates', rule, {
  valid: [],
  invalid: [{
    code: "db.collection('users').updateMany({}, { $pushAll: ['test'] });",
    errors: [{
      message: 'The $pushAll operator is deprecated, use the $push one with the $each modifier.',
    }],
  }, {
    code: "db.collection('users').updateMany({}, { $pullAll: ['test'] });",
    errors: [{
      message: 'The $pullAll operator is deprecated, use the $pull one.',
    }],
  }],
});
