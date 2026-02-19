import type { Meta, StoryObj } from '@storybook/react-vite';

import { PERIOD_PRESET_KEYS } from '@/constants/shared';

import { PeriodSelect } from '../period-select';

import { SectionHeader } from './SectionHeader';

const meta = {
  title: 'components/shared/section-header/SectionHeader',
  component: SectionHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    title: {
      control: 'text',
      defaultValue: '섹션 제목',
    },
    description: {
      control: 'text',
      defaultValue: '섹션에 대한 설명이 들어가는 자리입니다.',
    },
  },
} satisfies Meta<typeof SectionHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '섹션 제목',
    description: '섹션에 대한 설명이 들어가는 자리입니다.',
    prefixKey: ['sales', 'overview'],
  },
};

export const WithPeriodSelect: Story = {
  args: {
    title: '섹션 제목',
    description: '섹션에 대한 설명이 들어가는 자리입니다.',
    prefixKey: ['sales', 'overview'],
    rightSlot: (
      <PeriodSelect
        periodPreset={PERIOD_PRESET_KEYS.dayWeekMonth}
        periodType={undefined}
        setPeriodType={() => {}}
        setStartDate={() => {}}
        setEndDate={() => {}}
      />
    ),
  },
};
