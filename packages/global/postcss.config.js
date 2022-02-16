const { configuration } = require('@neo/postcss');

module.exports = configuration({
  customSyntax: true,
  plugins: [
    require('postcss-font-magician')(),
    // custom: {
    //   Inter: {
    //     variants: {
    //       normal: {
    //         400: {
    //           url: {
    //             woff2: 'path/to/my-body-font-normal-400.woff2',
    //           },
    //         },
    //       },
    //     },
    //   },
    // },
  ],
});
