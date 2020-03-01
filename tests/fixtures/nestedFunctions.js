import * as espree from 'espree';

const parsed = espree.parse(`
    function foo() {
      var x = 1;
      function bar() {
        x = 2;
      }
    }
`);

export default parsed;
