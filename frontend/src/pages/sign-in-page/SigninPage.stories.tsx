import type { Meta, StoryObj } from '@storybook/react-vite';

import { SignInPage } from './SignInPage';

const meta = {
  component: SignInPage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SignInPage>;
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
};
