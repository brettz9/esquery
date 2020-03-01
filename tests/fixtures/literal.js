import * as espree from 'espree';

const parsed = espree.parse(`
    var y = '\b\f\\n\\r\t\v and just a  back\\slash';
    var x = 21.35;
    var z = '\\z';
    var a = 'abc\\z';
`);

export default parsed;
