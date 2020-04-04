const esprima = require('esprima');

const parsed = esprima.parse(
    'var x = 1;' +
    'var y = \'y\';' +
    'x = x * 2;' +
    'if (y) { y += \'z\'; }'
);

module.exports = parsed;
