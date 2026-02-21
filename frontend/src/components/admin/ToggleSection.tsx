import type { ToggleOption } from '@/types/admin';
import { cn } from '@/utils/shared';

import { Button } from '../shared/shadcn-ui';

interface ToggleSectionProps {
  title: string;
  value: string;
  options: ToggleOption[];
  layout: 'compact' | 'full';
  onValueChange: (value: string) => void;
}

export const ToggleSection = ({
  title,
  value,
  options,
  layout,
  onValueChange,
}: ToggleSectionProps) => {
  return (
    <article>
      <p className="body-medium-semibold text-grey-700 mb-2">{title}</p>
      <div
        className={cn(
          'bg-grey-200 border-grey-300 rounded-250 w-full border p-1',
          layout === 'compact' && 'grid grid-cols-3 gap-1',
          layout === 'full' && 'grid grid-cols-4 gap-1',
        )}
      >
        {options.map((option) => {
          const Icon = option.icon;
          const isActive = value === option.value;

          return (
            <Button
              key={option.value}
              type="button"
              onClick={() => {
                onValueChange(option.value);
              }}
              className={cn(
                'body-medium-semibold text-grey-600 rounded-200 h-9 min-w-0 border px-2 transition-colors',
                isActive
                  ? 'bg-grey-0 text-brand-main border-grey-300'
                  : 'hover:bg-grey-300 border-transparent bg-transparent',
              )}
            >
              {Icon && <Icon className="mr-1 inline size-3.5 align-[-2px]" />}
              <span className="truncate whitespace-nowrap">{option.label}</span>
            </Button>
          );
        })}
      </div>
    </article>
  );
};
