import type { ReactNode } from 'react';

import { ChevronRight } from 'lucide-react';

import { cn } from '@/utils/shared';

interface DefaultCardWrapperProps {
  children: ReactNode;
  title?: string;
  hasChevronRightIcon?: boolean;
  onClickChevronRightIcon?: () => void;
  className?: string;
  width?: number;
  height?: number;
}

export const DefaultCardWrapper = ({
  children,
  title,
  hasChevronRightIcon = false,
  onClickChevronRightIcon,
  className,
  width,
  height,
}: DefaultCardWrapperProps) => {
  return (
    <article
      style={{ width, height }}
      className={cn(
        'bg-special-card-bg rounded-400 relative flex flex-col justify-between p-5',
        className,
      )}
    >
      {(title || hasChevronRightIcon) && (
        <div className="text-grey-700 relative flex items-center">
          {title && <h3 className="body-medium-semibold">{title}</h3>}
          {hasChevronRightIcon && (
            <button
              className="size-4 [&>svg]:size-full"
              onClick={onClickChevronRightIcon}
            >
              <ChevronRight />
            </button>
          )}
        </div>
      )}
      {children}
    </article>
  );
};
