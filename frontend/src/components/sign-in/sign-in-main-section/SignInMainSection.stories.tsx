import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { SignInMainSection } from './SignInMainSection';

const meta = {
  title: 'components/sign-in/sign-in-main-section/SignInMainSection',
  component: SignInMainSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SignInMainSection>;
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
  render: (args) => <SignInMainSection {...args} />,
};
