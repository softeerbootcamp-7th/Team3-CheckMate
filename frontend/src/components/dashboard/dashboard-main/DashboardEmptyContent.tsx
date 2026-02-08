import { CDN_BASE_URL } from '@/constants/shared';

export const DashboardEmptyContent = () => {
  return (
    <div className="flex flex-1 flex-col items-center pt-34">
      <img
        className="size-44.25"
        src={`${CDN_BASE_URL}/assets/images/empty_dashboard.png`}
        alt="Empty Dashboard"
      />
      <h1 className="headline-small-semibold text-grey-900 mt-3.75 mb-300 text-center whitespace-pre">
        {'대시보드에 지표 카드를\n추가해주세요.'}
      </h1>
      <p className="body-large-medium text-grey-700 text-center whitespace-pre">
        {'우측 상단의 카드 편집 버튼을 눌러\n원하는 카드를 편집해보세요.'}
      </p>
    </div>
  );
};
