import esbuild from 'esbuild';
import { TsconfigPathsPlugin as tsconfigPaths } from '@esbuild-plugins/tsconfig-paths';
import { nodeExternalsPlugin } from 'esbuild-node-externals';

esbuild.build({
  entryPoints: ['./src/index.ts'],
  platform: 'node',
  bundle: true,
  minify: true,
  format: 'cjs',
  outdir: 'dist',
  // treeShaking: true,
  loader: {
    '.ts': 'ts',
  },
  plugins: [nodeExternalsPlugin(), tsconfigPaths({ tsconfig: '../tsconfig.json' })],
});
