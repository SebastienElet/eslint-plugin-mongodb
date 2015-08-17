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
                context.report(node, 'Expected ' + property.key.name + ' operator value to be an object.');
                return false;
              }
              return property.value.properties.every(function(propertyNode) {
                if((!nodeIsDynamic(propertyNode.value)) &&
                  !nodeWillBeString(propertyNode.value)) {
                    context.report(node, property.key.name + ' operator require strings (key: ' + propertyNode.key.name + ').');
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

function nodeIsDynamic(node) {
  if('Literal' === node.type) {
    return false;
  }
  if('UnaryExpression' === node.type) {
    return nodeIsDynamic(node.argument);
  }
  if('BinaryExpression' === node.type) {
    return nodeIsDynamic(node.left) || nodeIsDynamic(node.right);
  }
  if('ObjectExpression' === node.type) {
    return node.properties.every(nodeIsDynamic);
  }
  if('Property' === node.type) {
    return nodeIsDynamic(node.value);
  }
  return true;
}

function nodeWillBeString(node) {
  if('Literal' === node.type) {
    return String(node.value) === node.value;
  } else if('UnaryExpression' === node.type) {
    return nodeWillBeString(node.argument);
  } else if('BinaryExpression' === node.type) {
    return nodeWillBeString(node.left) && nodeWillBeString(node.right);
  }
  return false;
}

module.exports = eMQCheckRenameUpdates;
