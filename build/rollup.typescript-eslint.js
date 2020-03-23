import {terser} from 'rollup-plugin-terser';

import json from '@rollup/plugin-json';

// We don't need this so long as we are hard-coding the
//    `node_modules` path for the sake of the browser, but keeping
//    in event we can use import paths later
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import builtins from 'rollup-plugin-node-builtins';

import replace from '@rollup/plugin-replace';

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
        input: require.resolve('@typescript-eslint/parser'),
        external: ['inspector', '@microsoft/typescript-etw'],
        output: {
            globals: {
                inspector: 'inspector',
                '@microsoft/typescript-etw': 'typescriptEtw'
            },
            format,
            exports: 'named',
            sourcemap: minifying,
            file: `parsers/typescript-eslint.${format}${minifying ? '.min' : ''}.js`,
            name: 'typescriptEslint'
        },
        plugins: [
            replace({
                'for (const global of': 'for (const glob of',
                'traceMap[global]': 'traceMap[glob]'
            }),
            json(),
            builtins(),
            nodeResolve({
                // We deal any unpolyfilled as is
                preferBuiltins: true
            }),
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
