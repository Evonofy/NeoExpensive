import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, render } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import { axe, toHaveNoViolations } from 'jest-axe';

import * as stories from './Button.stories';

expect.extend(toHaveNoViolations);

describe('Button component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should have hey', async () => {
    const { Primary } = composeStories(stories);

    const { container } = render(<Primary title={Primary?.args?.title!} />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
