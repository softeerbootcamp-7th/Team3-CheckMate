import { memo } from 'react';

interface StoreRegisterFormTitleProps {
  title: string;
}

export const StoreRegisterFormTitle = memo(
  ({ title }: StoreRegisterFormTitleProps) => {
    return (
      <h1 className="headline-small-semibold text-grey-900 text-center whitespace-pre-wrap">
        {title}
      </h1>
    );
  },
);

StoreRegisterFormTitle.displayName = 'StoreRegisterFormTitle';
