import { CDN_BASE_URL } from '@/constants/shared';

export const PosIntegrationWarningBanner = () => {
  return (
    <div className="rounded-200 bg-grey-100 flex items-center gap-1 px-3 py-[10.5px]">
      <img
        src={`${CDN_BASE_URL}/assets/images/warning.svg`}
        alt="경고 아이콘"
        className="size-8"
      />
      <p className="body-large-medium text-grey-700 leading-loose">
        연동이 끝날 때까지 화면을 닫거나 새로고침하지 말아주세요.
      </p>
    </div>
  );
};
