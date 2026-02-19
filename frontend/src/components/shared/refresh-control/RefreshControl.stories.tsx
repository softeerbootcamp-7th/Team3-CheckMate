import type { Meta, StoryObj } from '@storybook/react-vite';

import { RefreshControl } from './RefreshControl';

const meta = {
  title: 'components/shared/refresh-control/RefreshControl',
  component: RefreshControl,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    lastUpdatedDate: { control: 'date' },
    onRefresh: { action: 'refreshed' },
    isLoading: { control: 'boolean' },
  },
} satisfies Meta<typeof RefreshControl>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    lastUpdatedDate: new Date(),
    onRefresh: () => {},
    isLoading: false,
  },
};
