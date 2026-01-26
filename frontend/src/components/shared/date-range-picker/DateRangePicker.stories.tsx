import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { DATE_RANGE_PICKER_TYPE } from '@/constants/shared';

import { DateRangePicker } from './DateRangePicker';

const meta = {
  title: 'components/shared/date-range-picker/DateRangePicker',
  component: DateRangePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    startDate: { control: 'date' },
    endDate: { control: 'date', defaultValue: undefined },
    dateRangePickerType: {
      control: 'select',
      options: Object.values(DATE_RANGE_PICKER_TYPE),
    },
    setStartDate: { table: { disable: true } },
    setEndDate: { table: { disable: true } },
  },
} satisfies Meta<typeof DateRangePicker>;
export default meta;

type Story = StoryObj<typeof meta>;

const DateRangePickerStory = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  return (
    <DateRangePicker
      startDate={startDate}
      setStartDate={setStartDate}
      endDate={endDate}
      setEndDate={setEndDate}
      dateRangePickerType={DATE_RANGE_PICKER_TYPE.date}
    />
  );
};

export const Default: Story = {
  args: {
    startDate: undefined,
    endDate: undefined,
    dateRangePickerType: DATE_RANGE_PICKER_TYPE.date,
  },
  render: () => <DateRangePickerStory />,
};
