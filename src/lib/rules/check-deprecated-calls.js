'use strict';

const utils = require('../utils');
const DEPRECATED_METHODS = [
  'remove',
  'update',
  'findAndModify',
  'ensureIndex',
  'findAndRemove',
  'insert',
  'dropAllIndexes',
];

function eMQCheckDeprecatedCalls(context) {
  return utils.lookupCall(
    context,
    utils.getCallPatterns('deprecated', context.settings),
    (callSource, args, node) => {
      const method = callSource.split('.').pop();

      if (-1 !== DEPRECATED_METHODS.indexOf(method)) {
        context.report(node, `${method} method is deprecated.`);
        return false;
      }
      return true;
    }
  );
}

module.exports = eMQCheckDeprecatedCalls;
