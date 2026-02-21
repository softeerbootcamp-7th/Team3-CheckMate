import { CDN_BASE_URL } from '@/constants/shared';

export const DailyReportEmpty = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center pt-45">
      <img
        className="size-40"
        src={`${CDN_BASE_URL}/assets/images/empty_dashboard.png`}
        alt="Empty Dashboard"
      />
      <h1 className="headline-small-semibold text-grey-900 mt-3.75 mb-300 text-center whitespace-pre">
        리포트가 없어요.
      </h1>
      <p className="body-large-medium text-grey-700 text-center whitespace-pre">
        선택한 날짜에 발행된 리포트가 없어요.
      </p>
    </div>
  );
};
