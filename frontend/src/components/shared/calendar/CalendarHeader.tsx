import { CalendarNextButton } from './CalendarNextButton';
import { CalendarPreviousButton } from './CalendarPreviousButton';

interface CalendarHeaderProps {
  headerTitle: string;
  previousAriaLabel?: string;
  nextAriaLabel?: string;
  handleClickPreviousMonth: () => void;
  handleClickNextMonth: () => void;
}

export const CalendarHeader = ({
  headerTitle,
  previousAriaLabel = '이전으로 이동',
  nextAriaLabel = '다음으로 이동',
  handleClickPreviousMonth,
  handleClickNextMonth,
}: CalendarHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-350">
      <CalendarPreviousButton
        onClick={handleClickPreviousMonth}
        ariaLabel={previousAriaLabel}
      />
      <span className="body-small-bold">{headerTitle}</span>
      <CalendarNextButton
        onClick={handleClickNextMonth}
        ariaLabel={nextAriaLabel}
      />
    </div>
  );
};
