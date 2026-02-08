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
    endDate: { control: 'date' },
    dateRangePickerType: {
      control: 'select',
      options: Object.values(DATE_RANGE_PICKER_TYPE),
    },
  },
} satisfies Meta<typeof DateRangePicker>;
export default meta;

type Story = StoryObj<typeof meta>;

const DefaultDateRangePickerStory = (args: Story['args']) => {
  const [startDate, setStartDate] = useState<Date | undefined>(args.startDate);
  const [endDate, setEndDate] = useState<Date | undefined>(args.endDate);

  return (
    <DateRangePicker
      key={JSON.stringify(args)}
      startDate={startDate}
      setStartDate={setStartDate}
      endDate={endDate}
      setEndDate={setEndDate}
      dateRangePickerType={args.dateRangePickerType}
    />
  );
};

export const Default: Story = {
  args: {
    startDate: undefined,
    endDate: undefined,
    dateRangePickerType: DATE_RANGE_PICKER_TYPE.date,
  },
  render: (args) => {
    return <DefaultDateRangePickerStory {...args} />;
  },
};

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

const WeekDateRangePickerStory = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  return (
    <DateRangePicker
      startDate={startDate}
      setStartDate={setStartDate}
      endDate={endDate}
      setEndDate={setEndDate}
      dateRangePickerType={DATE_RANGE_PICKER_TYPE.week}
    />
  );
};

export const Date: Story = {
  args: {
    startDate: undefined,
    endDate: undefined,
    dateRangePickerType: DATE_RANGE_PICKER_TYPE.date,
  },
  render: () => <DateRangePickerStory />,
};

export const Week: Story = {
  args: {
    startDate: undefined,
    endDate: undefined,
    dateRangePickerType: DATE_RANGE_PICKER_TYPE.week,
  },
  render: () => <WeekDateRangePickerStory />,
};
