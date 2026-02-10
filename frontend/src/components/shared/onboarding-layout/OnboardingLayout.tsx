import type { PropsWithChildren } from 'react';

export const OnboardingLayout = ({ children }: PropsWithChildren) => {
  return <div className="onboarding-layout">{children}</div>;
};

const OnboardingSidebar = ({ children }: PropsWithChildren) => {
  return (
    <aside className="onboarding-sidebar bg-special-dashboard-bg size-full">
      {children}
    </aside>
  );
};

const OnboardingMain = ({ children }: PropsWithChildren) => {
  return (
    <main className="onboarding-main bg-special-card-bg size-full">
      {children}
    </main>
  );
};

const OnboardingFooter = ({ children }: PropsWithChildren) => {
  return (
    <footer className="onboarding-footer bg-special-card-bg size-full">
      {children}
    </footer>
  );
};

OnboardingLayout.Sidebar = OnboardingSidebar;
OnboardingLayout.Main = OnboardingMain;
OnboardingLayout.Footer = OnboardingFooter;
