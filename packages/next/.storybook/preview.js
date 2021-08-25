import { configure, addParameters, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withDesign } from 'storybook-addon-designs';
import centered from '@storybook/addon-centered/react';
import theme from './theme';

import './reset.css';

addParameters({
  options: {
    theme
  }
});

addDecorator(withInfo);
addDecorator(withDesign);
// addDecorator(centered);

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
};
