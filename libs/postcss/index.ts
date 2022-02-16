import autoprefixer from 'autoprefixer';
import stylelint from 'stylelint';
import nesting from 'postcss-nested';

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
  (settings: Configuration) =>
  ({ env }: PostCSSConfiguration): Configuration => {
    const dev = env === 'development';

    return {
      map: dev ? { inline: false } : false,
      parser: 'postcss-scss',
      plugins: [autoprefixer(), stylelint(), nesting()],
      ...settings,
    };
  };
