'use strict';

const utils = require('../utils');

function eMQCheckAddToSetUpdates(context) {
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
      return utils.everyProperties(args[1], [/\$addToSet/], property => {
        if ('ObjectExpression' !== property.value.type) {
          context.report(
            property,
            `Expected ${property.key.name} operator value to be an object.`
          );
          return false;
        }
        return property.value.properties.every(propertyNode => {
          if (utils.nodeIsDynamic(propertyNode.value)) {
            return true;
          }
          if (utils.nodeIsArray(propertyNode.value)) {
            context.report(
              propertyNode,
              `Adding an array with $addToSet adds the array, use the $each modifier to add each elements (key: ${
                propertyNode.key.name
              }).`
            );
            return false;
          }
          if ('ObjectExpression' !== property.value.type) {
            return true;
          }
          return utils.everyProperties(property.value, [/\$each/], property => {
            if (utils.nodeIsDynamic(property.value)) {
              return true;
            }
            if (
              '$each' === property.key.name &&
              !utils.nodeIsArray(property.value)
            ) {
              context.report(
                property,
                `Expected ${property.key.name} modifier value to be an array.`
              );
              return false;
            }
            return true;
          });
        });
      });
    }
  );
}

module.exports = eMQCheckAddToSetUpdates;
