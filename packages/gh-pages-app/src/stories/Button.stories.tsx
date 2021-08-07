import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';

import mdxDoc from './doc.mdx';

import { Button } from './Button';

export default {
  title: 'Dummy/Button',
  component: Button,
  argTypes: {
    // Assigns the argTypes to the Colors category
    backgroundColor: {
      control: 'color',
      table: {
        category: 'Colors',
        // Assigns the argTypes to a specific subcategory
        subcategory: 'Button colors'
      }
    },
    primary: {
      table: {
        category: 'Colors',
        subcategory: 'Button style'
      }
    },
    label: {
      table: {
        category: 'Text',
        subcategory: 'Button contents'
      }
    },
    // Assigns the argType to the Events category
    onClick: {
      table: {
        category: 'Events',
        subcategory: 'Button Events'
      }
    },
    // Assigns the argType to the Sizes category
    size: {
      table: {
        category: 'Sizes'
      }
    }
  },
  args: {
    backgroundColor: '#001100',
    primary: true
  },
  parameters: {
    docsOnly: false,
    docs: {
      page: mdxDoc
    },
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/FPDU6Ekw6eKzZlmiB6OhrB/Layout?node-id=315%3A77'
    }
  },
  decorators: [withDesign]
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = args => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Button'
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Button'
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Button'
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Button'
};
