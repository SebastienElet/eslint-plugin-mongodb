'use strict';

const rulesConfig = {
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
  'check-push-updates': 2,
  'check-pull-updates': 2,
  'check-pop-updates': 2,
  'check-addtoset-updates': 2,
  'check-deprecated-updates': 2,
};

const addPrefix = rules => {
  const result = {};

  for (const key in rules) {
    if (rules.hasOwnProperty(key)) {
      result[`mongodb/${key}`] = rules[key];
    }
  }
  return result;
};

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
    'check-push-updates': require('./lib/rules/check-push-updates'),
    'check-pull-updates': require('./lib/rules/check-pull-updates'),
    'check-pop-updates': require('./lib/rules/check-pop-updates'),
    'check-addtoset-updates': require('./lib/rules/check-addtoset-updates'),
    'check-deprecated-updates': require('./lib/rules/check-deprecated-updates'),
  },
  rulesConfig,
  configs: {
    recommended: {
      plugins: ['mongodb'],
      rules: rulesConfig,
    },
    all: {
      plugins: ['mongodb'],
      rules: addPrefix(rulesConfig),
    },
  },
};
