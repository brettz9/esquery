import * as espree from 'espree';

const parsed = espree.parse('for (i = 0; i < foo.length; i++) { foo[i](); }');

export default parsed;
