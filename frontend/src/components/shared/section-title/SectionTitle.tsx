import { useId } from 'react';

interface SectionTitleProps {
  title: string;
  description?: string;
}
export const SectionTitle = ({ title, description }: SectionTitleProps) => {
  const descId = useId();

  return (
    <div className="flex items-center gap-200">
      <h2
        aria-describedby={descId}
        className="title-medium-semibold text-grey-900"
      >
        {title}
      </h2>
      {description && (
        <span id={descId} className="body-medium-medium text-grey-600">
          {description}
        </span>
      )}
    </div>
  );
};
