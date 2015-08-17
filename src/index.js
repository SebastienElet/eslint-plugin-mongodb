module.exports = {
  rules: {
    'no-replace': require('./lib/rules/no-replace'),
    'check-numeric-updates': require('./lib/rules/check-numeric-updates'),
  },
  rulesConfig: {
    'no-replace': 1,
    'check-numeric-updates': 2,
  },
};
