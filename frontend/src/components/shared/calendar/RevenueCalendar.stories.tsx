import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { RevenueCalendar } from './RevenueCalendar';

const meta = {
  title: 'components/shared/calendar/RevenueCalendar',
  component: RevenueCalendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    selectedDate: { control: 'date' },
  },
} satisfies Meta<typeof RevenueCalendar>;
export default meta;

type Story = StoryObj<typeof meta>;

const DefaultRevenueCalendarStory = (args: Story['args']) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    args.selectedDate,
  );

  return (
    <RevenueCalendar
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
    />
  );
};

export const Default: Story = {
  args: {
    selectedDate: undefined,
    setSelectedDate: () => {},
  },
  render: (args) => {
    return <DefaultRevenueCalendarStory {...args} />;
  },
};
