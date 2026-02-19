import type { FallbackProps } from 'react-error-boundary';

import { CDN_BASE_URL } from '@/constants/shared';

export const DailyReportEmpty = ({ error }: FallbackProps) => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center pt-45">
      <img
        className="size-40"
        src={`${CDN_BASE_URL}/assets/images/empty_dashboard.png`}
        alt="Empty Dashboard"
      />
      <h1 className="headline-small-semibold text-grey-900 mt-3.75 mb-300 text-center whitespace-pre">
        {'리포트가 없어요.'}
      </h1>
      <p className="body-large-medium text-grey-700 text-center whitespace-pre">
        {error instanceof Error
          ? error.message
          : '데이터를 불러오는 중 오류가 발생했습니다.'}
      </p>
    </div>
  );
};
