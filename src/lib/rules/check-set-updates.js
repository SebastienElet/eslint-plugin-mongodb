'use strict';

const utils = require('../utils');

function eMQCheckSetUpdates(context) {
  return utils.lookupCall(
    context,
    utils.getCallPatterns('update', context.settings),
    (callSource, args) => {
      if (
        !args[1] ||
        'ObjectExpression' !== args[1].type ||
        !args[1].properties.length
      ) {
        return false;
      }
      return utils.everyProperties(
        args[1],
        [/\$(set|setOnInsert)/],
        property => {
          if ('ObjectExpression' !== property.value.type) {
            context.report(
              property,
              `Expected ${property.key.name} operator value to be an object.`
            );
            return false;
          }
          return true;
        }
      );
    }
  );
}

module.exports = eMQCheckSetUpdates;
