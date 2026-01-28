import { ONBOARDING_SIDEBAR_ITEM_LIST } from '@/constants/onboarding';

export const OnboardingSidebar = () => {
  return (
    <div className="mt-20 ml-10 flex size-full flex-col gap-16">
      <img src="/assets/logoWithTitle.svg" alt="Checkmate Logo" />
      <div className="flex flex-col gap-4">
        {ONBOARDING_SIDEBAR_ITEM_LIST.map((item) => (
          <div key={item.step} className="flex items-center gap-3">
            <span className="rounded-100 body-large-semibold size-7.5">
              {item.step}
            </span>
            <span className="body-large-bold">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
