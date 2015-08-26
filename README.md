# eslint-plugin-mongodb
> Eslint rules for MongoDB best practices.

[![NPM version](https://badge.fury.io/js/eslint-plugin-mongodb.svg)](https://npmjs.org/package/eslint-plugin-mongodb) [![Build status](https://secure.travis-ci.org/nfroidure/eslint-plugin-mongodb.svg)](https://travis-ci.org/nfroidure/eslint-plugin-mongodb) [![Dependency Status](https://david-dm.org/nfroidure/eslint-plugin-mongodb.svg)](https://david-dm.org/nfroidure/eslint-plugin-mongodb) [![devDependency Status](https://david-dm.org/nfroidure/eslint-plugin-mongodb/dev-status.svg)](https://david-dm.org/nfroidure/eslint-plugin-mongodb#info=devDependencies) [![Coverage Status](https://coveralls.io/repos/nfroidure/eslint-plugin-mongodb/badge.svg?branch=master)](https://coveralls.io/r/nfroidure/eslint-plugin-mongodb?branch=master) [![Code Climate](https://codeclimate.com/github/nfroidure/eslint-plugin-mongodb.svg)](https://codeclimate.com/github/nfroidure/eslint-plugin-mongodb)

** Disclaimer **
This is a work in progress. Use it only if you whish to be involved in this
 project evolution by reporting bugs or even sending PRs.

The first stable release will be [1.0.0](https://github.com/nfroidure/eslint-plugin-mongodb/milestones/v1.0.0).

# Usage

1. Install `eslint` as a dev-dependency:

```shell
npm install --save-dev eslint
```

2. Install `eslint-plugin-mongodb` as a dev-dependency:

```shell
npm install --save-dev eslint-plugin-mongodb
```

3. Enable the plugin by adding it to your `.eslintrc`:

```yaml
plugins:
  - mongodb
```

4. You can also configure these rules in your `.eslintrc`. All rules defined in
 this plugin have to be prefixed by 'mongodb/'

    ```yaml
    plugins:
      - mongodb
    rules:
      - mongodb/no-replace: 0
    ```

# Rules

## no-replace

Default: `'no_replace': 1`

Check update queries to ensure no raw replace is done.

## check-numeric-updates

Default: `'check-numeric-updates': 2`

Check update queries to ensure numeric operators like `$mul` and `$inc` contain
 numeric values.

## check-updates-calls

Default: `'check-updates-calls': 2`

Check update queries to ensure their arguments are well formed.

## check-rename-updates

Default: `'check-rename-updates': 2`

Check `$rename` update operator usage.

## check-unset-updates

Default: `'check-unset-updates': 2`

Check `$unset` update operator usage.

## check-current-date-updates

Default: `'check-current-date-updates': 2`

Check `$currentDate` update operator usage.

## How to create a new rule

Avoid wasting your time and follow those steps to suggest a new rule:
- create and issue prefixed by [rule] and followed by it's name
- OR create the rule tests file in the src/lib/rules directory directly, create
 a branch whose name is the proposed rule name. Finally create a pull request.
- let's discuss about the feature and its implementation details.
- implement the feature.

## Contributing
Feel free to push your code if you agree with publishing under the MIT license.

## Stats
[![NPM](https://nodei.co/npm/eslint-plugin-mongodb.png?downloads=true&stars=true)](https://nodei.co/npm/eslint-plugin-mongodb/)
[![NPM](https://nodei.co/npm-dl/eslint-plugin-mongodb.png)](https://nodei.co/npm/eslint-plugin-mongodb/)
