module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@infra': './src/infra'
        }
      }
    ]
  ],
  ignore: ['**/*.test.ts', '**/*.spec.ts', '**/*.html', '**/*.css']
};
