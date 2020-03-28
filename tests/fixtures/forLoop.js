const esprima = require('esprima');

const parsed = esprima.parse('for (i = 0; i < foo.length; i++) { foo[i](); }');

module.exports = parsed;
