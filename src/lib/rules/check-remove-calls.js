'use strict';

const utils = require('../utils');

function eMQCheckRemoveCalls(context) {
  return utils.lookupCall(
    context,
    utils.getCallPatterns('remove', context.settings),
    (callSource, args, node) => {
      if (!args[0]) {
        context.report(
          node,
          `Expected ${callSource} to have at least 1 argument.`
        );
        return false;
      }
      if (
        !utils.nodeIsDynamic(args[0]) &&
        'ObjectExpression' !== args[0].type
      ) {
        context.report(
          args[0],
          `Expected ${callSource} call first argument value to be an object.`
        );
        return false;
      }
      if (
        args[1] &&
        !utils.nodeIsDynamic(args[1]) &&
        'ObjectExpression' !== args[1].type &&
        'FunctionExpression' !== args[1].type
      ) {
        context.report(
          args[1],
          `Expected ${callSource} call second argument value to be an object or a callback function.`
        );
        return false;
      }
      if (
        args[2] &&
        !utils.nodeIsDynamic(args[2]) &&
        'FunctionExpression' !== args[2].type
      ) {
        context.report(
          args[2],
          `Expected ${callSource} call third argument value to be a callback function.`
        );
        return false;
      }
      if (args[3]) {
        context.report(
          node,
          `Expected ${callSource} call to have maximum 3 arguments.`
        );
        return false;
      }
      return true;
    }
  );
}

module.exports = eMQCheckRemoveCalls;
