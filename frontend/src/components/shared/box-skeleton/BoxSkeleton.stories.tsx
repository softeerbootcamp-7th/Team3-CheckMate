import type { Meta, StoryObj } from '@storybook/react-vite';

import { BoxSkeleton } from './BoxSkeleton';

const meta = {
  title: 'components/shared/box-skeleton/BoxSkeleton',
  component: BoxSkeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],

  argTypes: {
    classname: { control: 'text' },
  },
} satisfies Meta<typeof BoxSkeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <BoxSkeleton {...args} />,
};
