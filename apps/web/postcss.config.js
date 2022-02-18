module.exports = {
  plugins: [
    'autoprefixer',
    [
      '@fullhuman/postcss-purgecss',
      {
        content: ['./pages/**/*.{ts,tsx}'],
        defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
        safelist: ['html', 'body'],
      },
    ],
    [
      'postcss-preset-env',
      {
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 3,
        features: {
          'custom-properties': false,
        },
      },
    ],
  ],
};
