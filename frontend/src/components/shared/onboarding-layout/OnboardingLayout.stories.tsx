import type { Meta, StoryObj } from '@storybook/react-vite';

import { OnboardingLayout } from './OnboardingLayout';

const meta = {
  title: 'components/shared/onboarding-layout/OnboardingLayout',
  component: OnboardingLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof OnboardingLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  // #storybook-root 요소의 크기를 조절하기 위해 사용
  decorators: [
    (Story) => (
      <div className="h-screen w-screen">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <OnboardingLayout>
      <OnboardingLayout.Sidebar>sidebar</OnboardingLayout.Sidebar>
      <OnboardingLayout.Main>main</OnboardingLayout.Main>
    </OnboardingLayout>
  ),
};
