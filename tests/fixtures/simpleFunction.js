import * as espree from 'espree';

const parsed = espree.parse(`
    function foo(x, y) {
      var z = x + y;
      z++;
      return z;
    }
`);

export default parsed;
