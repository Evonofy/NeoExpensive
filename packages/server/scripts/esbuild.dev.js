const esbuild = require('esbuild');
const { TsconfigPathsPlugin: tsconfigPaths } = require('@esbuild-plugins/tsconfig-paths');
const { nodeExternalsPlugin } = require('esbuild-node-externals');

esbuild.build({
  entryPoints: ['./src/index.ts'],
  platform: 'node',
  bundle: false,
  minify: false,
  watch: true,
  format: 'cjs',
  outdir: 'dist',
  // treeShaking: true,
  loader: {
    '.ts': 'ts',
  },
  plugins: [nodeExternalsPlugin(), tsconfigPaths({ tsconfig: '../tsconfig.json' })],
});
