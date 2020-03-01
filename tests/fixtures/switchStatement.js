import * as espree from 'espree';

const parsed = espree.parse(`
    var x = 1;
    switch (x) {
      case 0: foo1(); break;
      case 1: foo2(); break;
      default: x = 1; break;
    }
`);

export default parsed;
