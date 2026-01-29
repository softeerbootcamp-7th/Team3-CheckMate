import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { DateRangeLabel } from './DateRangeLabel';

const meta = {
  title: 'components/shared/date-range-label/DateRangeLabel',
  component: DateRangeLabel,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],

  argTypes: {
    label: { control: 'text' },
    ariaLabel: { control: 'text' },
    isSelected: { control: 'boolean' },
    onClick: fn(),
  },
} satisfies Meta<typeof DateRangeLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: '오늘',
    ariaLabel: '오늘 날짜 선택',
    isSelected: false,
    onClick: () => {},
  },
};

export const Selected: Story = {
  args: {
    label: '오늘',
    ariaLabel: '오늘 날짜 선택',
    isSelected: true,
    onClick: () => {},
  },
};
