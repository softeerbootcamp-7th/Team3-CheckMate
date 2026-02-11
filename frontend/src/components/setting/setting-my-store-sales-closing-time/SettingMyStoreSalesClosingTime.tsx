interface SettingMyStoreSalesClosingTimeProps {
  salesClosingTime: number;
}

export const SettingMyStoreSalesClosingTime = ({
  salesClosingTime,
}: SettingMyStoreSalesClosingTimeProps) => {
  return (
    <article className="flex flex-col gap-4">
      <span className="body-large-semibold text-grey-900">매출 마감 시간</span>
      <div className="flex justify-between">
        <span className="body-medium-medium text-grey-900 w-53">
          실제 매장 마감 시간보다 2~3시간 이후로 입력해주세요
        </span>
        <div className="body-medium-semibold bg-grey-100 rounded-150 flex h-10.5 w-20 items-center justify-center px-250 py-200">
          {salesClosingTime}시
        </div>
      </div>
      <span className="body-medium-medium text-grey-600">
        이 시간을 기준으로 24시간 단위로 하루 매출이 집계돼요.
      </span>
    </article>
  );
};
