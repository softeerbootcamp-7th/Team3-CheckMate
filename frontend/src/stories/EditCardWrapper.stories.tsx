import type { Meta, StoryObj } from '@storybook/react-vite';

import { EditCardWrapper } from '../components/shared/edit-card-wrapper/EditCardWrapper';

const meta: Meta<typeof EditCardWrapper> = {
  title: 'components/shared/edit-card-wraper/EditCardWrapper',
  component: EditCardWrapper,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isAdded: { control: 'boolean' },
    period: { control: 'text' },
    className: { control: 'text' },
    onClickAddButton: { action: 'onClickAddButton' },
    onClickDeleteButton: { action: 'onClickDeleteButton' },
    children: { control: false }, // children은 스토리에서 직접 JSX로 구성
  },
};

export default meta;

type Story = StoryObj<typeof EditCardWrapper>;

const SampleChild = () => {
  return (
    <div className="flex w-[300px] flex-col gap-[6px]">
      <div className="title-large-semibold break-keep">
        강한 비바람이 예상돼요
      </div>
      <span className="body-small-medium pr-6 break-keep text-gray-600">
        저녁 매장 방문 고객은 줄고, 테이크아웃·배달 수요가 늘 가능성이 있어요
      </span>
    </div>
  );
};

export const Default: Story = {
  args: {
    isAdded: false,
    period: '오늘',
    children: <SampleChild />,
  },
};

export const WideChildeComponent: Story = {
  args: {
    isAdded: false,
    period: '오늘',
    children: (
      <div className="flex h-[200px] w-[1060px] flex-col gap-2 bg-amber-300">
        <div className="title-large-semibold break-keep">
          가로가 긴 자식 콘텐츠
        </div>
        <span className="body-small-medium break-keep text-gray-600">
          width-1060, h-200 으로 설정
        </span>
      </div>
    ),
  },
};

export const LongChildeComponent: Story = {
  args: {
    isAdded: false,
    period: '오늘',
    children: (
      <div className="flex h-[800px] w-[200px] flex-col gap-2 bg-amber-300">
        <div className="title-large-semibold break-keep">
          세로가 긴 자식 콘텐츠
        </div>
        <span className="body-small-medium break-keep text-gray-600">
          width-200, h-800 으로 설정
        </span>
      </div>
    ),
  },
};
