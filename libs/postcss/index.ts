import autoprefixer from 'autoprefixer';
import stylelint from 'stylelint';
import nesting from 'postcss-nested';
import minify from 'cssnano';
import imports from 'postcss-import';

type Configuration = {
  syntax?: string;
  customSyntax?: any;
  parser?: any;
  map?:
    | {
        sourcesContent?: boolean;
        annotation?: boolean;
        inline: boolean;
      }
    | boolean;
  plugins?: any[];
};

type PostCSSConfiguration = {
  cwd: string;
  env: 'development';
  file: {
    dirname: string;
    basename: string;
    extname: string;
  };
};

export const configuration =
  ({ ...settings }: Configuration) =>
  ({ env }: PostCSSConfiguration): Configuration => {
    const dev = env === 'development';
    const plugins = settings.plugins !== undefined ? settings.plugins : [];

    return {
      map: dev ? { inline: false } : false,
      parser: 'postcss-scss',
      ...settings,
      plugins: [
        autoprefixer(),
        stylelint(),
        nesting(),
        imports(),
        minify({
          preset: require('cssnano-preset-advanced'),
        }),
        ...plugins,
      ],
    };
  };
