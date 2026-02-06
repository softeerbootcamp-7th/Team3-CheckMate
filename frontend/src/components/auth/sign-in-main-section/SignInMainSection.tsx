import { FEATURE_CARD_LIST } from '@/constants/auth';

import { FeatureCard } from '../feature-card';
import { SignInButton } from '../sign-in-button';

export const SignInMainSection = () => {
  return (
    <section className="flex size-full flex-col items-center justify-between pt-52 pb-7">
      <div className="flex flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-200">
          <h1 className="headline-small-semibold text-grey-900">로그인</h1>
          <p className="body-medium-medium text-grey-600">
            SNS로 간편하게 로그인하고 서비스를 즐겨보세요!
          </p>
        </div>
        <div className="grid grid-cols-[1fr_1fr] gap-4">
          {FEATURE_CARD_LIST.map((featureCard) => (
            <FeatureCard key={featureCard.description} {...featureCard} />
          ))}
        </div>
        <SignInButton />
      </div>
      <p className="body-medium-medium text-grey-500">
        Copyright(C) CHECKMATE.ALL RIGHTS RESERVED.
      </p>
    </section>
  );
};
