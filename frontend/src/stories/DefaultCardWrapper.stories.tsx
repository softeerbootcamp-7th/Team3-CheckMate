import type { Meta, StoryObj } from '@storybook/react-vite';

import { DefaultCardWrapper } from '@/components/shared/default-card-wrapper';
const meta: Meta<typeof DefaultCardWrapper> = {
  title: 'components/shared/default-card-wrapper/DefaultCardWrapper',
  component: DefaultCardWrapper,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: { control: 'text' },
    hasChevronRightIcon: { control: 'boolean' },
    onClickChevronRightIcon: { action: 'onClickChevronRightIcon' },
    className: { control: 'text' },
    width: { control: { type: 'number', min: 0 } },
    height: { control: { type: 'number', min: 0 } },
    children: { control: false },
  },
};

export default meta;

type Story = StoryObj<typeof DefaultCardWrapper>;

const SampleChild = () => {
  return (
    <div className="flex flex-col gap-[6px]">
      <div className="title-large-semibold break-keep">
        포장용기/소모품/배달 메뉴 노출을 점검해보세요
      </div>
      <span className="body-small-medium pr-6 break-keep text-gray-600">
        저녁 매장 방문 고객은 줄고, 테이크아웃·배달 수요가 늘 가능성이 있어요
      </span>
    </div>
  );
};

export const Default: Story = {
  args: {
    title: '오늘 날씨 예보',
    children: <SampleChild />,
  },
};

export const WithTitleIcon: Story = {
  args: {
    width: 340,
    height: 228,
    title: '오늘 날씨 예보',
    hasChevronRightIcon: true,
    children: <SampleChild />,
  },
};
