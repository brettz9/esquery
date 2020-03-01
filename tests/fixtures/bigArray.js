import * as espree from 'espree';

const parsed = espree.parse(
    '[1, 2, 3, foo, bar, 4, 5, baz, qux, 6]'
);

export default parsed;
