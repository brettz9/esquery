import esquery from "../esquery.js";
import * as espree from 'espree';

describe("basic query parsing", function () {

    it.only('test experimental spread', function () {
        const parsed = espree.parse(`
        const a = {};
        const b = { ...a };
        `, {
            ecmaVersion: 2018
        });
        console.log('parsed', parsed.body[1].declarations[0].init);
        esquery.query(parsed, 'CallExpression[callee.name=/^(invokeMap|get|has|hasIn|invoke|result|set|setWith|unset|update|updateWith)$/] > :not(ArrayExpression):nth-child(2)');
    });


    it("empty query", function () {
        assert.equal(void 0, esquery.parse(""));
        assert.equal(void 0, esquery.parse("      "));
    });

    it("leading/trailing whitespace", function () {
        assert.notEqual(void 0, esquery.parse(" A"));
        assert.notEqual(void 0, esquery.parse("     A"));
        assert.notEqual(void 0, esquery.parse("A "));
        assert.notEqual(void 0, esquery.parse("A     "));
        assert.notEqual(void 0, esquery.parse(" A "));
        assert.notEqual(void 0, esquery.parse("     A     "));
    });
});
