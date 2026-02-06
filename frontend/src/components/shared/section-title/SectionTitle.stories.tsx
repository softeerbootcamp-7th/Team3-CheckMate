import type { Meta, StoryObj } from '@storybook/react-vite';

import { SectionTitle } from './SectionTitle';

const meta = {
  title: 'components/shared/section-title/SectionTitle',
  component: SectionTitle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
  },
} satisfies Meta<typeof SectionTitle>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '매출 현황',
    description: '실제 매출과 주문 상황을 한눈에 확인해요.',
  },
};
