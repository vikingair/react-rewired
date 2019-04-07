import babel from 'rollup-plugin-babel';
import flowEntry from 'rollup-plugin-flow-entry';

const babelConfig = babel({
    exclude: 'node_modules/**',
    presets: [['@babel/preset-env', { modules: false, targets: { node: '8' } }]],
});
const plugins = [babelConfig, flowEntry()];

export default [
    {
        input: 'src/index.js',
        plugins,
        external: ['react'],
        output: [{ dir: 'dist/cjs', format: 'cjs' }, { dir: 'dist/esm', format: 'esm' }],
    },
];
