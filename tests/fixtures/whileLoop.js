import * as espree from 'espree';

const parsed = espree.parse(`
    x = 10;
    while (x > 0) { x--; }
`);

export default parsed;
