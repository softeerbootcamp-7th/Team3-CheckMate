import type { Meta, StoryObj } from '@storybook/react-vite';

import { Input } from './Input';

const meta = {
  title: 'components/shared/input/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isError: { control: 'boolean' },
    errorMessage: { control: 'text' },
    className: { control: 'text' },
    inputClassName: { control: 'text' },
    children: { control: 'text' },
    placeholder: { control: 'text' },
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Enter your email',
  },
};

export const WithLabel: Story = {
  args: {
    label: '라벨',
    description: '라벨입니다.',
  },
};

export const WithSuccess: Story = {
  args: {
    isSuccess: true,
    successMessage: 'This is a success message',
  },
};

export const WithError: Story = {
  args: {
    isError: true,
    errorMessage: 'This is an error message',
  },
};
