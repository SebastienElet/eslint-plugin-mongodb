'use strict';

module.exports = {
  rules: {
    'check-insert-calls': require('./lib/rules/check-insert-calls'),
    'check-update-calls': require('./lib/rules/check-update-calls'),
    'check-query-calls': require('./lib/rules/check-query-calls'),
    'check-remove-calls': require('./lib/rules/check-remove-calls'),
    'check-deprecated-calls': require('./lib/rules/check-deprecated-calls'),
    'no-replace': require('./lib/rules/no-replace'),
    'check-numeric-updates': require('./lib/rules/check-numeric-updates'),
    'check-rename-updates': require('./lib/rules/check-rename-updates'),
    'check-unset-updates': require('./lib/rules/check-unset-updates'),
    'check-current-date-updates': require('./lib/rules/check-current-date-updates'),
    'check-minmax-updates': require('./lib/rules/check-minmax-updates'),
    'check-set-updates': require('./lib/rules/check-set-updates'),
  },
  rulesConfig: {
    'check-insert-calls': 2,
    'check-update-calls': 2,
    'check-query-calls': 2,
    'check-remove-calls': 2,
    'check-deprecated-calls': 2,
    'no-replace': 1,
    'check-numeric-updates': 2,
    'check-rename-updates': 2,
    'check-unset-updates': 2,
    'check-current-date-updates': 2,
    'check-minmax-updates': 2,
    'check-set-updates': 2,
  },
};
