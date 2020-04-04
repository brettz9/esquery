const esquery = require('../');
const forLoop = require('./fixtures/forLoop.js');
const simpleProgram = require('./fixtures/simpleProgram.js');
const conditional = require('./fixtures/conditional.js');

describe('matches', function () {
    it('falsey node', function () {
        const selector = esquery.parse('*');

        assert.equal(false, esquery.matches(
            null,
            selector,
            []
        ));

        assert.equal(false, esquery.matches(
            '',
            selector,
            []
        ));

        assert.equal(false, esquery.matches(
            false,
            selector,
            []
        ));
    });

    it('falsey selector', function () {
        assert.equal(true, esquery.matches(
            forLoop,
            null,
            []
        ));

        assert.equal(true, esquery.matches(
            forLoop,
            '',
            []
        ));

        assert.equal(true, esquery.matches(
            forLoop,
            false,
            []
        ));
    });

    it('falsey ancestry', function () {
        const selector = esquery.parse('*');

        assert.doesNotThrow(function () {
            esquery.matches(
                forLoop,
                selector,
                null
            );
        });

        assert.doesNotThrow(function () {
            esquery.matches(
                forLoop,
                selector,
                ''
            );
        });

        assert.doesNotThrow(function () {
            esquery.matches(
                forLoop,
                selector,
                false
            );
        });
    });

    it('missing parent', function () {
        var selector = esquery.parse('!VariableDeclaration + !ExpressionStatement');
        assert.doesNotThrow(function () {
            esquery.matches(
                simpleProgram.body[2],
                selector,
                []
            );
        });

        selector = esquery.parse('!VariableDeclaration ~ IfStatement');
        assert.doesNotThrow(function () {
            esquery.matches(
                simpleProgram.body[3],
                selector,
                []
            );
        });
    });

    it('adjacent/sibling', function () {
        var selector = esquery.parse('!VariableDeclaration + !ExpressionStatement');
        assert.doesNotThrow(function () {
            esquery.matches(
                simpleProgram.body[2],
                selector,
                simpleProgram.body
            );
        });

        selector = esquery.parse('!VariableDeclaration ~ IfStatement');
        assert.doesNotThrow(function () {
            esquery.matches(
                simpleProgram.body[3],
                selector,
                simpleProgram.body
            );
        });
    });

    it('Non-array list prop', function () {
        var selector = esquery.parse('!IfStatement ~ IfStatement');
        assert.doesNotThrow(function () {
            esquery.matches(
                conditional.body[1],
                selector,
                conditional.body
            );
        });

        selector = esquery.parse('!IfStatement + IfStatement');
        assert.doesNotThrow(function () {
            esquery.matches(
                conditional.body[1],
                selector,
                conditional.body
            );
        });
    });
});
