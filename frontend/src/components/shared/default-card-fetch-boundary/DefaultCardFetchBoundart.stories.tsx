import type { Meta, StoryObj } from '@storybook/react-vite';

import { DefaultCardFetchBoundary } from './DefaultCardFetchBoundary';

const meta: Meta<typeof DefaultCardFetchBoundary> = {
  title:
    'Components/Shared/default-card-fetch-boundary/DefaultCardFetchBoundary',
  component: DefaultCardFetchBoundary,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof DefaultCardFetchBoundary>;

interface ExampleChildProps {
  isLoading?: boolean;
  isError?: boolean;
}

const ExampleChild = ({
  isLoading = false,
  isError = false,
}: ExampleChildProps) => {
  if (isError) {
    throw new Error('에러가 발생했습니다.');
  }
  if (isLoading) {
    throw new Promise(() => {});
  }

  return <div className="w-56 bg-white p-6 shadow-sm">예시 자식 컴포넌트</div>;
};

export const Default: Story = {
  args: {
    children: <ExampleChild />,
  },
};

export const Loading: Story = {
  args: {
    children: <ExampleChild isLoading={true} />,
  },
};

export const ErrorOccurred: Story = {
  args: {
    children: <ExampleChild isError={true} />,
  },
};
