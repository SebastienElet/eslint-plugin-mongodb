'use strict';

var utils = require('../utils');

function eMQCheckRemoveCalls(context) {

  return utils.lookupCall(context, utils.getCallPattern('remove', context.settings),
    function(callSource, args, node) {
      if(!args[0]) {
        context.report(node, 'Expected ' + callSource +
          ' to have at least 1 argument.');
        return false;
      }
      if((!args[0]) || ((!utils.nodeIsDynamic(args[0])) &&
        'ObjectExpression' !== args[0].type)) {
        context.report(args[1], 'Expected ' + callSource +
          ' call first argument value to be an object.');
        return false;
      }
      if(args[1] && 'ObjectExpression' !== args[1].type) {
        context.report(args[1], 'Expected ' + callSource +
          ' call second argument value to be an object.');
        return false;
      }
      return true;
    }
  );

}

module.exports = eMQCheckRemoveCalls;
