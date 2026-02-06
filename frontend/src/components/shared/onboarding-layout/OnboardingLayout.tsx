import type { PropsWithChildren } from 'react';

export const OnboardingLayout = ({ children }: PropsWithChildren) => {
  return <div className="grid size-full grid-cols-[300px_1fr]">{children}</div>;
};

const OnboardingSidebar = ({ children }: PropsWithChildren) => {
  return (
    <aside className="bg-special-dashboard-bg size-full">{children}</aside>
  );
};

const OnboardingMain = ({ children }: PropsWithChildren) => {
  return <main className="bg-special-card-bg size-full">{children}</main>;
};

OnboardingLayout.Sidebar = OnboardingSidebar;
OnboardingLayout.Main = OnboardingMain;
