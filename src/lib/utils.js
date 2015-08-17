'use strict';

// See http://docs.mongodb.org/master/reference/method/js-collection/

var utils = {
  CALL_PATTERNS: {
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
};

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
