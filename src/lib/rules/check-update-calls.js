'use strict';

const utils = require('../utils');

function eMQCheckUpdateCalls(context) {
  return utils.lookupCall(
    context,
    utils.getCallPatterns('update', context.settings),
    (callSource, args, node) => {
      if (!args[0] || !args[1]) {
        context.report(
          node,
          `Expected ${callSource} to have at least 2 arguments.`
        );
        return false;
      }
      if (
        !args[0] ||
        (!utils.nodeIsDynamic(args[0]) && 'ObjectExpression' !== args[0].type)
      ) {
        context.report(
          args[0],
          `Expected ${callSource} call first argument value to be an object.`
        );
        return false;
      }
      if (
        !args[1] ||
        (!utils.nodeIsDynamic(args[1]) && 'ObjectExpression' !== args[1].type)
      ) {
        context.report(
          args[1],
          `Expected ${callSource} call second argument value to be an object.`
        );
        return false;
      }
      if (
        args[2] &&
        (!utils.nodeIsDynamic(args[2]) &&
          'ObjectExpression' !== args[2].type &&
          'FunctionExpression' !== args[2].type)
      ) {
        context.report(
          args[2],
          `Expected ${callSource} call third argument value to be an object or a callback function.`
        );
        return false;
      }
      if (
        args[3] &&
        ('ObjectExpression' === args[3].type ||
          (!utils.nodeIsDynamic(args[3]) &&
            'FunctionExpression' !== args[3].type))
      ) {
        context.report(
          args[3],
          `Expected ${callSource} call fourth argument value to be a callback function.`
        );
        return false;
      }
      if (args[4]) {
        context.report(
          node,
          `Expected ${callSource} call to have maximum 4 arguments.`
        );
        return false;
      }
      return true;
    }
  );
}

module.exports = eMQCheckUpdateCalls;
