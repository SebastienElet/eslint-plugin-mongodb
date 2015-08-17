'use strict';

module.exports = {
  rules: {
    'no-replace': require('./lib/rules/no-replace'),
    'check-numeric-updates': require('./lib/rules/check-numeric-updates'),
    'check-renames': require('./lib/rules/check-rename-updates'),
  },
  rulesConfig: {
    'no-replace': 1,
    'check-numeric-updates': 2,
    'check-rename-updates': 2,
  },
};
