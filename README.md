# eslint-plugin-mongodb
> Eslint rules for the [NodeJS MongoDB native driver 2.0](http://mongodb.github.io/node-mongodb-native/2.0/) syntax and best practices.

[![NPM version](https://badge.fury.io/js/eslint-plugin-mongodb.svg)](https://npmjs.org/package/eslint-plugin-mongodb) [![Build status](https://secure.travis-ci.org/nfroidure/eslint-plugin-mongodb.svg)](https://travis-ci.org/nfroidure/eslint-plugin-mongodb) [![Dependency Status](https://david-dm.org/nfroidure/eslint-plugin-mongodb.svg)](https://david-dm.org/nfroidure/eslint-plugin-mongodb) [![devDependency Status](https://david-dm.org/nfroidure/eslint-plugin-mongodb/dev-status.svg)](https://david-dm.org/nfroidure/eslint-plugin-mongodb#info=devDependencies) [![Coverage Status](https://coveralls.io/repos/nfroidure/eslint-plugin-mongodb/badge.svg?branch=master)](https://coveralls.io/r/nfroidure/eslint-plugin-mongodb?branch=master) [![Code Climate](https://codeclimate.com/github/nfroidure/eslint-plugin-mongodb.svg)](https://codeclimate.com/github/nfroidure/eslint-plugin-mongodb)

**Disclaimer:**
This is a work in progress. Use it only if you wish to be involved in this
 project evolution by reporting bugs or even sending PRs.

The first stable release will be [1.0.0](https://github.com/nfroidure/eslint-plugin-mongodb/milestones/v1.0.0).

## Usage

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

## Settings

In order to recognize MongoDB native driver queries, this plugin check for
function calls. By using [shared settings](http://eslint.org/docs/user-guide/configuring.html#adding-shared-settings)
 you can specify your own patterns, here are the defaults:

```json
{
    "settings": {
        "mongodb": {
          "callPatterns": {
            "query": [
              "(\\.|^)db\\.collection\\([^\\)]+\\)\\.(find|findOne|)$",
            ],
            "update": [
              "(\\.|^)db\\.collection\\([^\\)]+\\)\\.(findOneAndUpdate|updateOne|updateMany)$",
            ],
            "insert": [
              "(\\.|^)db\\.collection\\([^\\)]+\\)\\.(insertOne|insertMany)$",
            ],
            "remove": [
              "(\\.|^)db\\.collection\\([^\\)]+\\)\\.(findOneAndDelete|deleteOne|deleteMany)$",
            ],
            "deprecated": [
              "(\\.|^)db\\.collection\\([^\\)]+\\)\\.(remove|update|findAndModify|ensureIndex|findAndRemove|insert|dropAllIndexes)$",
            ]
          }
        }
    }
})
```

Note that the above are strings representing regular expressions. It will be
 cast with the `RegExp` constructor so you have to escape your escapes ;).

## Rules

### check-insert-calls

Default: `'check-insert-calls': 2`

Check `insertOne`/`insertMany` calls to ensure their arguments are well formed.

### check-query-calls

Default: `'check-query-calls': 2`

Check `find`/`findOne` calls to ensure their arguments are well formed.

### check-update-calls

Default: `'check-update-calls': 2`

Check `update` calls to ensure their arguments are well formed.

### check-remove-calls

Default: `'check-remove-calls': 2`

Check `remove` calls to ensure their arguments are well formed.

### check-deprecated-calls

Default: `'check-deprecated-calls': 2`

Check collection calls and warn in case of deprecated methods usage.

### no-replace

Default: `'no_replace': 1`

Check update queries to ensure no raw replace is done.

### check-rename-updates

Default: `'check-rename-updates': 2`

Check `$rename` update operator usage.

### check-unset-updates

Default: `'check-unset-updates': 2`

Check `$unset` update operator usage.

### check-current-date-updates

Default: `'check-current-date-updates': 2`

Check `$currentDate` update operator usage.

### check-numeric-updates

Default: `'check-numeric-updates': 2`

Check update queries to ensure numeric operators like `$mul` and `$inc` contain
 numeric values.

### check-minmax-updates

Default: `'check-minmax-updates': 2`

Check `$min` and `$max` update operators usage.

### check-set-updates

Default: `'check-set-updates': 2`

Check `$set` and `$setOnInsert` update operators usage.

### check-push-updates

Default: `'check-push-updates': 2`

Check `$push` update operator usage and its modifiers.

### check-pull-updates

Default: `'check-pull-updates': 2`

Check `$pull` update operator usage.

### check-pop-updates

Default: `'check-pop-updates': 2`

Check `$pop` update operator usage.

### check-addtoset-updates

Default: `'check-addtoset-updates': 2`

Check `$addToSet` update operator usage and common misuses.

### check-deprecated-updates

Default: `'check-deprecated-updates': 2`

Check deprecated update operator usage.

## Contributing
Feel free to push your code if you agree with publishing under the MIT license.

### How to create a new rule

Avoid wasting your time and follow those steps to suggest a new rule:
- create and issue prefixed by [rule] and followed by it's name
- OR create the rule tests file in the src/lib/rules directory directly, create
 a branch whose name is the proposed rule name. Finally create a pull request.
- let's discuss about the feature and its implementation details.
- implement the feature.

### Changing a specific rule behavior

Create and issue prefixed by [rule] and let us know what should change.

## Stats
[![NPM](https://nodei.co/npm/eslint-plugin-mongodb.png?downloads=true&stars=true)](https://nodei.co/npm/eslint-plugin-mongodb/)
[![NPM](https://nodei.co/npm-dl/eslint-plugin-mongodb.png)](https://nodei.co/npm/eslint-plugin-mongodb/)
