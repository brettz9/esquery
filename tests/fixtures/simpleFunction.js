const esprima = require('esprima');

const parsed = esprima.parse(
    'function foo(x, y) {' +
      'var z = x + y;' +
      'z++;' +
      'return z;' +
    '}'
);

module.exports = parsed;
