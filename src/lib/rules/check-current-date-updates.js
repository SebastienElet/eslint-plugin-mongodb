'use strict';

const utils = require('../utils');

function eMQCheckCurrentDateUpdates(context) {
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
      return utils.everyProperties(args[1], [/\$currentDate/], property => {
        if (
          'ObjectExpression' !== property.value.type &&
          !utils.nodeWillBeBoolean(property.value)
        ) {
          context.report(
            property,
            `Expected ${
              property.key.name
            } operator value to be a boolean or an object.`
          );
          return false;
        }
        if ('ObjectExpression' === property.value.type) {
          return property.value.properties.every(propertyNode => {
            if ('$type' !== propertyNode.key.name) {
              context.report(
                propertyNode,
                `${
                  property.key.name
                } operator should only have a $type modifier (found: ${
                  propertyNode.key.name
                }).`
              );
              return false;
            }
            if (
              utils.nodeIsString(propertyNode.value) &&
              -1 === ['timestamp', 'date'].indexOf(propertyNode.value.value)
            ) {
              context.report(
                propertyNode,
                `${property.key.name} operator ${
                  propertyNode.key.name
                } modifier value can be only "date" or "timestamp" (got: ${
                  propertyNode.value.value
                }).`
              );
              return false;
            }
            return true;
          });
        }
        return true;
      });
    }
  );
}

module.exports = eMQCheckCurrentDateUpdates;
