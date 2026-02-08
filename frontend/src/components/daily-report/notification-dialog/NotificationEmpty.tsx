export const NotificationEmpty = () => {
  return (
    <div className="mt-4 flex h-85 flex-col items-center justify-center gap-2">
      {/* 임시 이미지 주소 */}
      <object data="images.svg" className="bg-grey-300 size-13" />
      <p className="text-grey-900 body-small-medium">
        현재 확인할 알림이 없어요.
      </p>
    </div>
  );
};
