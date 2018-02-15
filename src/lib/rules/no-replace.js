'use strict';

const utils = require('../utils');

function eMQNoReplace(context) {
  return utils.lookupCall(
    context,
    utils.getCallPatterns('update', context.settings),
    (callSource, args) => {
      if (!args[1] || 'ObjectExpression' !== args[1].type) {
        return false;
      }
      return utils.everyProperties(args[1], [/[^\$].*/], property => {
        if (0 !== property.key.name.indexOf('$')) {
          context.report(
            property,
            'Raw update of a complete collection entry.'
          );
          return false;
        }
      });
    }
  );
}

module.exports = eMQNoReplace;
