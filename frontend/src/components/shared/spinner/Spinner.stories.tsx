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
        'Tailwind CSS 클래스를 추가할 수 있습니다. 부여한 color 속성에 opacity: 0.1이 적용된 색상이 배경색으로 적용됩니다.',
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
