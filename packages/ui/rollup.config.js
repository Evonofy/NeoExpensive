import peerDepsExternal from 'rollup-plugin-peer-deps-external';
// import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';

const config = {
  input: ['src/index.ts', 'src/components/Button/index.ts'],
  output: [
    {
      dir: '.',
      format: 'esm',
      sourcemap: true,
    },
  ],
  preserveModules: true,
  plugins: [
    peerDepsExternal(),
    // resolve(),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true }),
    postcss(),
  ],
};

export default config;
