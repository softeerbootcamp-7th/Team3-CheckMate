import type { Meta, StoryObj } from '@storybook/react-vite';

import { Spinner } from '../spinner';

import { StateWrapper } from './StateWrapper';

const meta: Meta<typeof StateWrapper> = {
  title: 'Components/Shared/state-wrapper/StateWrapper',
  component: StateWrapper,
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <div className="flex min-h-75 items-center justify-center bg-gray-50 p-10">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof StateWrapper>;

export const Default: Story = {
  args: {
    children: <div></div>,
  },
};

export const WithError: Story = {
  args: {
    children: (
      <div className="flex flex-col items-center text-center">
        <span className="mb-2 text-3xl">⚠️</span>
        <h4 className="text-md font-bold text-red-600">오류 발생</h4>
        <p className="mb-4 text-xs text-gray-400">잠시 후 다시 시도해주세요.</p>
        <button className="text-xs text-gray-600 underline transition hover:text-black">
          다시 시도
        </button>
      </div>
    ),
  },
};

export const WithLoading: Story = {
  args: {
    children: (
      <div className="flex flex-col items-center gap-4 text-gray-400">
        <Spinner className="size-12" />
        <p className="text-sm italic">로딩중 입니다</p>
      </div>
    ),
  },
};
