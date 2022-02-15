import autoprefixer from 'autoprefixer';
import stylelint from 'stylelint';

type Configuration = {
  syntax: string;
  customSyntax: any;
  parser: any;
  map: {
    sourcesContent: boolean;
    annotation: boolean;
  };
  plugins: any[];
};

export const configuration =
  () =>
  ({ ...args }: Configuration): Configuration => {
    return {
      ...args,
      syntax: 'postcss-scss',
      plugins: [...args.plugins, autoprefixer, stylelint],
    };
  };
