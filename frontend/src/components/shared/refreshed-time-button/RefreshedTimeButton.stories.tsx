import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from '@/services/shared';

import { RefreshedTimeButton } from './RefreshedTimeButton';

const RefreshedTimeButtonWithProvider = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RefreshedTimeButton queryKey={['example-query-key']} />
    </QueryClientProvider>
  );
};

const meta = {
  title: 'components/shared/refreshed-time-button/RefreshedTimeButton',
  component: RefreshedTimeButtonWithProvider,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    queryKey: {
      control: 'text',
      description: '업데이트 시간 알고 싶은 쿼리의 쿼리 키 값.',
    },
  },
} satisfies Meta<typeof RefreshedTimeButtonWithProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    queryKey: ['example-query-key'],
  },
};
