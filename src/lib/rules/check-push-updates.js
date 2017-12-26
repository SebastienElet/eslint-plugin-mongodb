'use strict';

const utils = require('../utils');

function eMQCheckPushUpdates(context) {
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
      return utils.everyProperties(args[1], [/\$push/], property => {
        if (utils.nodeIsDynamic(property.value)) {
          return true;
        }
        if ('ObjectExpression' !== property.value.type) {
          context.report(
            property,
            `Expected ${property.key.name} operator value to be an object.`
          );
          return false;
        }
        return utils.everyProperties(property.value, [/.*/], property => {
          if (utils.nodeIsDynamic(property.value)) {
            return true;
          }
          if ('ObjectExpression' !== property.value.type) {
            return true;
          }
          return utils.everyProperties(
            property.value,
            [/\$(each|slice|position)/],
            property => {
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
              if (
                '$slice' === property.key.name &&
                !utils.nodeWillBeNumber(property.value)
              ) {
                context.report(
                  property,
                  `Expected ${property.key.name} modifier value to be a number.`
                );
                return false;
              }
              if (
                '$position' === property.key.name &&
                !utils.nodeWillBeNumber(property.value)
              ) {
                context.report(
                  property,
                  `Expected ${property.key.name} modifier value to be a number.`
                );
                return false;
              }
              return true;
            }
          );
        });
      });
    }
  );
}

module.exports = eMQCheckPushUpdates;
