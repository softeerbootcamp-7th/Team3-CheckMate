import type { PropsWithChildren } from 'react';

import { CDN_BASE_URL } from '@/constants/shared';

export const OnboardingSidebar = ({ children }: PropsWithChildren) => {
  return (
    <div className="mt-20 ml-10 flex size-full flex-col gap-16">
      <img
        src={`${CDN_BASE_URL}/assets/images/logoWithTitle.svg`}
        alt="Checkmate Logo"
        className="h-[74px] w-[183px]"
      />
      {children}
    </div>
  );
};
