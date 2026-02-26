import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { PaginationBar } from './PaginationBar';

const meta: Meta<typeof PaginationBar> = {
  title: 'Components/shared/pagination-bar/PaginationBar',
  component: PaginationBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof PaginationBar>;

const PaginationContainer = (args: {
  totalPageCount: number;
  currentPage: number;
}) => {
  const [currentPage, setCurrentPage] = useState(args.currentPage || 1);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === args.totalPageCount;

  const handlePrev = () =>
    setCurrentPage((prev: number) => Math.max(1, prev - 1));
  const handleNext = () =>
    setCurrentPage((prev: number) => Math.min(args.totalPageCount, prev + 1));
  const handlePageClick = (page: number) => setCurrentPage(page);

  return (
    <PaginationBar
      {...args}
      currentPage={currentPage}
      isFirstPage={isFirstPage}
      isLastPage={isLastPage}
      handleClickPrev={handlePrev}
      handleClickNext={handleNext}
      handleClickPage={handlePageClick}
    />
  );
};

export const Default: Story = {
  args: {
    totalPageCount: 5,
    currentPage: 1,
  },
  render: (args) => <PaginationContainer {...args} />,
};
