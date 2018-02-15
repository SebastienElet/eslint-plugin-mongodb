'use strict';

const utils = require('../utils');

function eMQCheckRenameUpdates(context) {
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
      return utils.everyProperties(args[1], [/\$rename/], property => {
        if ('ObjectExpression' !== property.value.type) {
          context.report(
            property,
            `Expected ${property.key.name} operator value to be an object.`
          );
          return false;
        }
        return property.value.properties.every(propertyNode => {
          if (
            !utils.nodeIsDynamic(propertyNode.value) &&
            !utils.nodeWillBeString(propertyNode.value)
          ) {
            context.report(
              propertyNode,
              `${property.key.name} operator require strings (key: ${
                propertyNode.key.name
              }).`
            );
            return false;
          }
          return true;
        });
      });
    }
  );
}

module.exports = eMQCheckRenameUpdates;
