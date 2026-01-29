import type { ReactNode } from 'react';

import { cn } from '@/utils/shared/lib/utils';

interface DefaultCardWrapperProps {
  children: ReactNode;
  title?: string;
  titleIcon?: ReactNode;
  onClickTitleIcon?: () => void;
  className?: string;
  width?: number;
  height?: number;
}

export const DefaultCardWrapper = ({
  children,
  title,
  titleIcon,
  onClickTitleIcon,
  className,
  width,
  height,
}: DefaultCardWrapperProps) => {
  return (
    <article
      style={{ width, height }}
      className={cn(
        'bg-special-card-bg rounded-400 flex flex-col justify-between p-5',
        className,
      )}
    >
      <div className="relative flex items-center text-gray-700">
        {title && <h3 className="body-medium-semibold">{title}</h3>}
        {titleIcon && (
          <button
            className="size-4 [&>svg]:size-full"
            onClick={onClickTitleIcon}
          >
            {titleIcon}
          </button>
        )}
      </div>
      {children}
    </article>
  );
};
