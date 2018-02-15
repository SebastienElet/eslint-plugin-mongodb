'use strict';

const utils = require('../utils');

function eMQCheckDeprecatedUpdates(context) {
  return utils.lookupCall(
    context,
    utils.getCallPatterns('update', context.settings),
    (callSource, args) => {
      if (
        !args[1] ||
        'ObjectExpression' !== args[1].type ||
        !args[1].properties.length
      ) {
        return false;
      }
      return utils.everyProperties(
        args[1],
        [/\$(pushAll|pullAll)/],
        property => {
          if ('$pushAll' === property.key.name) {
            context.report(
              property,
              'The $pushAll operator is deprecated, ' +
                'use the $push one with the $each modifier.'
            );
            return false;
          }
          if ('$pullAll' === property.key.name) {
            context.report(
              property,
              'The $pullAll operator is deprecated, ' + 'use the $pull one.'
            );
            return false;
          }
          return true;
        }
      );
    }
  );
}

module.exports = eMQCheckDeprecatedUpdates;
