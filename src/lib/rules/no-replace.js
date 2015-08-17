'use strict';

var utils = require('../utils');

function eMQNoReplace(context) {
  var callPatterns = utils.CALL_PATTERNS.UPDATE;

  return {
    CallExpression: function(node) {

      callPatterns.every(function(callPattern) {
        if(callPattern.exec(context.getSource(node.callee))) {

          if(2 > node.arguments.length) {
            context.report(node, 'Update query is missing second argument.');
            return false;
          }

          if(!node.arguments[1].properties.length) {
            context.report(node, 'Update query with an empty object.');
            return false;
          }

          return node.arguments[1].properties.every(function(property) {
            if('Identifier' !== property.key.type) {
              context.report(node, 'Avoid computed property keys for the update queries.');
              return false;
            }
            if(0 !== property.key.name.indexOf('$')) {
              context.report(node, 'Raw update of a complete collection entry.');
              return false;
            }
            return true;
          });

        }
        return true;
      });

    },
  };
}

module.exports = eMQNoReplace;
