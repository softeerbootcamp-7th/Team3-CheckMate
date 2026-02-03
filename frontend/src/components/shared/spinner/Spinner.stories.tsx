import type { Meta, StoryObj } from '@storybook/react-vite';

import { Spinner } from './Spinner';

const meta = {
  title: 'components/shared/spinner/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    className: {
      control: 'text',
      description:
        'Tailwind CSS 클래스를 추가할 수 있습니다. 전달한 text 색상 클래스는 SVG의 currentColor로 사용되어 스피너의 색상을 결정하며, SVG 내부 일부 path에는 동일한 색상에 opacity: 0.1이 적용되어 옅은 영역이 표현됩니다.',
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: 'text-brand-500 size-10',
  },
};
