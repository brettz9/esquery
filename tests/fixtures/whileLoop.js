const esprima = require('esprima');

const parsed = esprima.parse(
    'x = 10;' +
    'while (x > 0) { x--; }'
);

module.exports = parsed;
