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
          '@infra': './src/infra',
          '@user': './src/domain/user'
        }
      }
    ]
  ],
  ignore: ['**/*.test.ts', '**/*.spec.ts', '**/*.html', '**/*.css']
};
