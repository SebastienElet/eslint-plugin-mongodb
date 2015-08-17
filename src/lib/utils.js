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
};

module.exports = utils;
