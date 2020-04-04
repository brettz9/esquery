const esprima = require('esprima');

const parsed = esprima.parse(
    'function foo() {' +
      'var x = 1;' +
      'function bar() {' +
        'x = 2;' +
      '}' +
    '}'
);

module.exports = parsed;
