import {terser} from 'rollup-plugin-terser';

import json from '@rollup/plugin-json';

// We don't need this so long as we are hard-coding the
//    `node_modules` path for the sake of the browser, but keeping
//    in event we can use import paths later
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';

/**
 * @external RollupConfig
 * @type {PlainObject}
 * @see {@link https://rollupjs.org/guide/en#big-list-of-options}
 */

/**
 * @param {PlainObject} [config= {}]
 * @param {boolean} [config.minifying=false]
 * @param {string} [config.format='umd']
 * @returns {external:RollupConfig}
 */
function getRollupObject ({minifying, format = 'umd'} = {}) {
    const nonMinified = {
        input: require.resolve('babel-eslint'),
        output: {
            format,
            exports: 'named',
            sourcemap: minifying,
            file: `parsers/babel-eslint.${format}${minifying ? '.min' : ''}.js`,
            name: 'babelEslint'
        },
        plugins: [
            json(),
            globals(),
            builtins(),
            nodeResolve(),
            commonjs()
        ]
    };
    if (minifying) {
        nonMinified.plugins.push(terser());
    }
    return nonMinified;
}

export default [
    getRollupObject({minifying: false, format: 'umd'}),
    // getRollupObject({minifying: false, format: 'esm'}) // Might use later
];
