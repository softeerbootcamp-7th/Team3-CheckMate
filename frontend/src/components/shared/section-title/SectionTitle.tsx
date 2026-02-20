import { useId } from 'react';

interface SectionTitleProps {
  title: string;
  description?: string;
}
export const SectionTitle = ({ title, description }: SectionTitleProps) => {
  const descId = useId();

  return (
    <div className="flex min-w-0 items-center gap-200">
      <h2
        aria-describedby={descId}
        className="title-medium-semibold text-grey-900 shrink-0"
      >
        {title}
      </h2>
      {description && (
        <span id={descId} className="body-medium-medium text-grey-600 truncate">
          {description}
        </span>
      )}
    </div>
  );
};
