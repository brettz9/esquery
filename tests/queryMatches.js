const esquery = require('../');
const conditional = require('./fixtures/conditional.js');
const forLoop = require('./fixtures/forLoop.js');
const simpleFunction = require('./fixtures/simpleFunction.js');
const simpleProgram = require('./fixtures/simpleProgram.js');

describe('Pseudo matches query', function () {

    it('conditional matches', function () {
        const matches = esquery(conditional, ':matches(IfStatement)');
        assert.includeMembers(matches, [
            conditional.body[0],
            conditional.body[1].alternate
        ]);
    });

    it('for loop matches', function () {
        const matches = esquery(forLoop, ':matches(BinaryExpression, MemberExpression)');
        assert.includeMembers(matches, [
            forLoop.body[0].test,
            forLoop.body[0].body.body[0].expression.callee
        ]);
    });

    it('simple function matches', function () {
        const matches = esquery(simpleFunction, ':matches([name="foo"], ReturnStatement)');
        assert.includeMembers(matches, [
            simpleFunction.body[0].id,
            simpleFunction.body[0].body.body[2]
        ]);
    });

    it('simple program matches', function () {
        const matches = esquery(simpleProgram, ':matches(AssignmentExpression, BinaryExpression)');
        assert.includeMembers(matches, [
            simpleProgram.body[2].expression,
            simpleProgram.body[3].consequent.body[0].expression,
            simpleProgram.body[2].expression.right
        ]);
    });

    it('implicit matches', function () {
        const matches = esquery(simpleProgram, 'AssignmentExpression, BinaryExpression, NonExistant');
        assert.includeMembers(matches, [
            simpleProgram.body[2].expression,
            simpleProgram.body[3].consequent.body[0].expression,
            simpleProgram.body[2].expression.right
        ]);
    });

});
