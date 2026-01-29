import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { SignInSidebar } from './SignInSidebar';

const meta = {
  title: 'components/sign-in/sign-in-sidebar/SignInSidebar',
  component: SignInSidebar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SignInSidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div className="h-screen w-screen">
        <Story />
      </div>
    ),
  ],
  args: {
    onClick: fn(),
  },
  render: (args) => <SignInSidebar {...args} />,
};
