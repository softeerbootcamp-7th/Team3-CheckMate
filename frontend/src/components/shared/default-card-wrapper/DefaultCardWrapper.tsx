import type { ComponentProps, ReactNode } from 'react';

import { ChevronRight } from 'lucide-react';

import { cn } from '@/utils/shared';

import { Button } from '../shadcn-ui';

interface DefaultCardWrapperProps extends ComponentProps<'article'> {
  children: ReactNode;
  title?: string;
  hasChevronRightIcon?: boolean;
  onClickChevronRightIcon?: () => void;
  className?: string;
  width?: number;
  height?: number;
}

export const DefaultCardWrapper = ({
  /** DefaultCardWrapper 자식 컴포넌트 */
  children,
  /** DefaultCardWrapper 제목 */
  title,
  /** DefaultCardWrapper 오른쪽 아이콘 여부 */
  hasChevronRightIcon = false,
  /** DefaultCardWrapper 오른쪽 아이콘 클릭 핸들러 */
  onClickChevronRightIcon,
  /** DefaultCardWrapper 클래스명 */
  className,
  /** 기타 article 태그 속성들 */
  ...props
}: DefaultCardWrapperProps) => {
  return (
    <article
      className={cn(
        'bg-special-card-bg rounded-400 relative flex h-57 w-85 flex-col justify-between p-5',
        className,
      )}
      {...props}
    >
      {(title || hasChevronRightIcon) && (
        <div className="text-grey-700 relative flex items-center">
          {title && <h3 className="body-medium-semibold">{title}</h3>}
          {hasChevronRightIcon && (
            <Button className="p-0!" onClick={onClickChevronRightIcon}>
              <ChevronRight className="size-4" />
            </Button>
          )}
        </div>
      )}
      {children}
    </article>
  );
};
