import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { SignInButton } from './SignInButton';

const meta = {
  title: 'components/sign-in/sign-in-button/SignInButton',
  component: SignInButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SignInButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClick: fn(),
  },
  render: (args) => <SignInButton {...args} />,
};
