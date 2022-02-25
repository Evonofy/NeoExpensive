import React from 'react';
import { userEvent, within } from '@storybook/testing-library';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { linkTo } from '@storybook/addon-links';

import Button, { ButtonComponentProps } from './Button';

const story: ComponentMeta<typeof Button> = {
  title: 'Button/Button',
  component: Button,
};

export const Template: ComponentStory<typeof Button> = ({ ...args }) => <Button {...args} title="dadsa" onClick={() => linkTo('Button', 'second')} />;

export const Primary = Template.bind({});
Primary.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  userEvent.click(await canvas.findByText('Hey'));
};
Primary.args = {
  title: 'Hey',
} as ButtonComponentProps;

export const Secondary = Template.bind({});
Secondary.args = {
  title: 'Hey2',
} as ButtonComponentProps;

export default story;
