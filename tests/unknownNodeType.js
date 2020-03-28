const esquery = require('../');
const AST = require('./fixtures/unknownNodeTypeAST.js');

describe('Unknown node type', function () {
    it('does not throw', function () {
        try {
            esquery(AST, '*');
        } catch (e) {
            assert.fail();
        }
    });
});
