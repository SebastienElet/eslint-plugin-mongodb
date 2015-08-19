'use strict';

module.exports = {
  rules: {
    'check-update-calls': require('./lib/rules/check-update-calls'),
    'no-replace': require('./lib/rules/no-replace'),
    'check-numeric-updates': require('./lib/rules/check-numeric-updates'),
    'check-rename-updates': require('./lib/rules/check-rename-updates'),
    'check-unset-updates': require('./lib/rules/check-unset-updates'),
  },
  rulesConfig: {
    'check-update-calls': 2,
    'no-replace': 1,
    'check-numeric-updates': 2,
    'check-rename-updates': 2,
    'check-unset-updates': 2,
  },
};
