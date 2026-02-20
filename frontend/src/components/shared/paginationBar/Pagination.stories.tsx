// PaginationBar.stories.tsx
import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { PaginationBar } from './PaginationBar';

const meta: Meta<typeof PaginationBar> = {
  title: 'components/shared/pagination-bar/PaginationBar',
  component: PaginationBar,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: {
    currentPage: 1,
    totalPageCount: 7,
    isFirstPage: true,
    isLastPage: false,
    handleClickPrev: () => {},
    handleClickNext: () => {},
    handleClickPage: () => {},
  },
  argTypes: {
    currentPage: { control: false },
    isFirstPage: { control: false },
    isLastPage: { control: false },
    handleClickPrev: { control: false },
    handleClickNext: { control: false },
    handleClickPage: { control: false },
  },
};

export default meta;

type Story = StoryObj<typeof PaginationBar>;

const ActivePaginationBar = (args: Story['args'] = {}) => {
  const total = args.totalPageCount ?? 1;

  const [currentPage, setCurrentPage] = useState<number>(args.currentPage ?? 1);

  const safeCurrentPage = Math.min(Math.max(1, currentPage), total);

  const isFirstPage = safeCurrentPage === 1;
  const isLastPage = safeCurrentPage === total;

  const handleClickPrev = () => setCurrentPage((prev) => Math.max(1, prev - 1));
  const handleClickNext = () =>
    setCurrentPage((prev) => Math.min(total, prev + 1));
  const handleClickPage = (page: number) => setCurrentPage(page);

  return (
    <PaginationBar
      {...args}
      currentPage={safeCurrentPage}
      totalPageCount={total}
      isFirstPage={isFirstPage}
      isLastPage={isLastPage}
      handleClickPrev={handleClickPrev}
      handleClickNext={handleClickNext}
      handleClickPage={handleClickPage}
    />
  );
};

export const Default: Story = {
  render: (args) => <ActivePaginationBar {...args} />,
};

export const bgHasColor: Story = {
  render: (args) => (
    <div className="bg-gray-200 p-4">
      <ActivePaginationBar {...args} />
    </div>
  ),
};
