import type { Meta, StoryObj } from '@storybook/react-vite';

import { ButtonGroup } from './ButtonGroup';

const meta = {
  title: 'components/shared/button-group/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof ButtonGroup>;

export default meta;

interface ButtonGroupStoryArgs {
  positiveLabel: string;
  negativeLabel: string;
  onPositiveClick: () => void;
  onNegativeClick: () => void;
  disabled?: boolean;
}

type Story = StoryObj<ButtonGroupStoryArgs>;

export const Default: Story = {
  args: {
    positiveLabel: '저장',
    negativeLabel: '취소',
    onPositiveClick: () => {},
    onNegativeClick: () => {},
    disabled: false,
  },
  render: ({
    positiveLabel,
    negativeLabel,
    onPositiveClick,
    onNegativeClick,
    disabled,
  }) => (
    <ButtonGroup>
      <ButtonGroup.Negative message={negativeLabel} onClick={onNegativeClick} />
      <ButtonGroup.Positive
        message={positiveLabel}
        onClick={onPositiveClick}
        disabled={disabled}
      />
    </ButtonGroup>
  ),
};

export const Disabled: Story = {
  args: {
    positiveLabel: '예',
    negativeLabel: '아니오',
    onPositiveClick: () => {},
    onNegativeClick: () => {},
    disabled: true,
  },
  render: ({
    positiveLabel,
    negativeLabel,
    onPositiveClick,
    onNegativeClick,
    disabled,
  }) => (
    <ButtonGroup>
      <ButtonGroup.Negative message={negativeLabel} onClick={onNegativeClick} />
      <ButtonGroup.Positive
        message={positiveLabel}
        onClick={onPositiveClick}
        disabled={disabled}
      />
    </ButtonGroup>
  ),
};
