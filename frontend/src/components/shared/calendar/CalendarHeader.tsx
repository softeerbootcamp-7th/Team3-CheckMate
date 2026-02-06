import { CalendarNextButton } from './CalendarNextButton';
import { CalendarNextButton } from './CalendarNextButton';
import { CalendarPreviousButton } from './CalendarPreviousButton';
import { CalendarPreviousButton } from './CalendarPreviousButton';

interface CalendarHeaderProps {
  headerTitle: string;
  previousAriaLabel?: string;
  nextAriaLabel?: string;
  handleClickPrevious: () => void;
  handleClickNext: () => void;
}

export const CalendarHeader = ({
  headerTitle,
  previousAriaLabel = '이전으로 이동',
  nextAriaLabel = '다음으로 이동',
  handleClickPrevious,
  handleClickNext,
}: CalendarHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-350">
      <CalendarPreviousButton
        onClick={handleClickPrevious}
        ariaLabel={previousAriaLabel}
      />
      <span className="body-small-bold">{headerTitle}</span>
      <CalendarNextButton onClick={handleClickNext} ariaLabel={nextAriaLabel} />
    </div>
  );
};
