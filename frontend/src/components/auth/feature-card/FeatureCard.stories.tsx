import type { Meta, StoryObj } from '@storybook/react-vite';

import { FEATURE_CARD_LIST } from '@/constants/auth';

import { FeatureCard } from './FeatureCard';

const meta = {
  title: 'components/sign-in/feature-card/FeatureCard',
  component: FeatureCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    featureImagePath: {
      control: 'select',
      options: FEATURE_CARD_LIST.map((feature) => feature.featureImagePath),
    },
    description: { control: 'text' },
  },
} satisfies Meta<typeof FeatureCard>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    featureImagePath: FEATURE_CARD_LIST[0].featureImagePath,
    description: FEATURE_CARD_LIST[0].description,
  },
};
