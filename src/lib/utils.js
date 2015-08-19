'use strict';

var YError = require('yerror');

var utils = {
  CALL_PATTERNS: {
    // See http://docs.mongodb.org/master/reference/method/js-collection/
    QUERY: [
      /(\.|^)db\.collection\([^\)]+\)\.(find|findOne|)/,
    ],
    UPDATE: [
      /(\.|^)db\.collection\([^\)]+\)\.(update|findAndModify)/,
    ],
    INSERT: [
      /(\.|^)db\.collection\([^\)]+\)\.insert/,
    ],
    REMOVE: [
      /(\.|^)db\.collection\([^\)]+\)\.remove/,
    ],
  },
  nodeIsDynamic: nodeIsDynamic,
  nodeWillBeString: nodeWillBeString,
  nodeWillBeNumber: nodeWillBeNumber,
  lookupCall: lookupCall,
  everyProperties: everyProperties,
};

function lookupCall(context, callPatterns, cb) {
  return {
    CallExpression: function(node) {
      var functionCallSource = context.getSource(node.callee);

      callPatterns.some(function(callPattern) {
        if(callPattern.exec(functionCallSource)) {
          cb.call(this, functionCallSource, node.arguments, node);
          return true;
        }
      });
    },
  };
}

function everyProperties(node, propertyPatterns, cb) {
  if('ObjectExpression' !== node.type) {
    throw new YError('E_BAD_NODE', node.type);
  }
  return node.properties.every(function(property) {
    // Discard computed properties (maybe warn as harmful in another rule?)
    if('Identifier' !== property.key.type) {
      return true;
    }
    if(propertyPatterns.some(function(propertyPattern) {
      return !!propertyPattern.exec(property.key.name);
    })) {
      return cb(property);
    }
    return true;
  });
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

function nodeWillBeNumber(node) {
  if('Literal' === node.type) {
    return Number(node.value) === node.value;
  } else if('UnaryExpression' === node.type) {
    return nodeWillBeNumber(node.argument);
  } else if('BinaryExpression' === node.type) {
    return nodeWillBeNumber(node.left) && nodeWillBeNumber(node.right);
  }
  return false;
}

module.exports = utils;
