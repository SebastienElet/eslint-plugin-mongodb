'use strict';

var utils = require('../utils');

function eMQCheckRenameUpdates(context) {
  var callPatterns = utils.CALL_PATTERNS.UPDATE;

  return {
    CallExpression: function(node) {

      callPatterns.every(function(callPattern) {
        if(callPattern.exec(context.getSource(node.callee))) {

          if(2 > node.arguments.length || !node.arguments[1].properties.length) {
            return false;
          }

          return node.arguments[1].properties.every(function(property) {
            if('Identifier' !== property.key.type) {
              return false;
            }
            if('$rename' === property.key.name) {
              if('ObjectExpression' !== property.value.type) {
                context.report(node, 'Expected ' + property.key.name +
                  ' operator value to be an object.');
                return false;
              }
              return property.value.properties.every(function(propertyNode) {
                if((!utils.nodeIsDynamic(propertyNode.value)) &&
                  !utils.nodeWillBeString(propertyNode.value)) {
                  context.report(node, property.key.name +
                    ' operator require strings (key: ' + propertyNode.key.name + ').');
                  return false;
                }
                return true;
              });
            }
            return true;
          });

        }
        return true;
      });

    },
  };
}

module.exports = eMQCheckRenameUpdates;
