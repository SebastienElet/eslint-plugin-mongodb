'use strict';

var utils = require('../utils');

function eMQCheckUpdateCalls(context) {

  return utils.lookupCall(context, utils.getCallPatterns('update', context.settings),
    function(callSource, args, node) {
      if((!args[0]) || !args[1]) {
        context.report(node, 'Expected ' + callSource +
          ' to have at least 2 arguments.');
        return false;
      }
      if((!args[0]) || ((!utils.nodeIsDynamic(args[0])) &&
        'ObjectExpression' !== args[0].type)) {
        context.report(args[1], 'Expected ' + callSource +
          ' call first argument value to be an object.');
        return false;
      }
      if((!args[1]) || ((!utils.nodeIsDynamic(args[1])) &&
        'ObjectExpression' !== args[1].type)) {
        context.report(args[1], 'Expected ' + callSource +
          ' call second argument value to be an object.');
        return false;
      }
      if(args[2] && 'ObjectExpression' !== args[2].type) {
        context.report(args[2], 'Expected ' + callSource +
          ' call third argument value to be an object.');
        return false;
      }
      return true;
    }
  );

}

module.exports = eMQCheckUpdateCalls;
