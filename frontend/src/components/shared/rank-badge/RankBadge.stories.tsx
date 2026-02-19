import type { Meta, StoryObj } from '@storybook/react-vite';

import { RankBadge } from './RankBadge';

const meta = {
  title: 'components/shared/rank-badge/RankBadge',
  component: RankBadge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    rank: { control: 'number' },
    variant: { control: 'select', options: ['default', 'highlight'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof RankBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    rank: 1,
    variant: 'default',
    size: 'md',
  },
};
