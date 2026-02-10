import { CDN_BASE_URL } from '@/constants/shared/cdnBaseUrl';

export const NotificationEmpty = () => {
  return (
    <div className="mt-4 flex h-85 flex-col items-center justify-center gap-2">
      {/* 임시 이미지 주소 */}
      <object
        data={`${CDN_BASE_URL}/assets/images/alarm_none.svg`}
        className="size-13"
      />
      <p className="text-grey-900 body-small-medium">
        현재 확인할 알림이 없어요.
      </p>
    </div>
  );
};
