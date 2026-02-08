import { CDN_BASE_URL } from '@/constants/shared';
import { formatDateLocalized, formatNumber } from '@/utils/shared';

interface DailyReportContentProps {
  selectedDate?: Date;
}
export const DailyReportContent = ({
  selectedDate,
}: DailyReportContentProps) => {
  return (
    <div className="bg-special-card-bg rounded-400 h-176.5 w-full p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-grey-500 body-small-medium mb-0.5">
            {formatDateLocalized(selectedDate ?? new Date())}
          </p>
          <h2 className="title-small-bold text-grey-900 [&>strong]:text-brand-main">
            오늘은 <strong>형용사/구</strong>한 날이에요.
          </h2>
        </div>
        <div>
          <span className="text-grey-700 body-medium-semibold mr-2">
            오늘의 총평
          </span>
          <span className="rounded-unlimit bg-special-dashboard-bg text-brand-main body-large-bold px-[12px] py-[6px]">
            양호
          </span>
        </div>
      </div>

      <div className="mt-6 flex gap-5">
        {Array(3)
          .fill(null)
          .map(() => (
            <div className="bg-special-dashboard-bg rounded-400 w-full p-5 pb-4.5">
              <h3 className="text-grey-700 body-medium-semibold">실매출</h3>
              <p className="text-grey-900 title-medium-bold mt-2.75 mb-0.5">
                {formatNumber(1234000)}원
              </p>
              <div className="flex items-center">
                <object
                  data={`${CDN_BASE_URL}/assets/images/up.svg`}
                  className="inline size-4"
                />
                <span className="text-brand-main body-small-semibold">
                  +11.2%
                </span>
                <span className="text-grey-500 caption-large-medium ml-1">
                  동 요일 대비
                </span>
              </div>
            </div>
          ))}
      </div>

      <div className="mt-10 grid grid-cols-2 gap-5">
        <div>
          <h3 className="text-grey-700 body-medium-semibold mb-4">
            오늘의 인사이트
          </h3>
          <div className="flex flex-col gap-3">
            {Array(3)
              .fill(null)
              .map(() => (
                <p className="bg-grey-100 rounded-200 text-grey-900 body-small-medium [&>strong]:text-brand-main px-4 py-3">
                  취소건수가 6건으로 기준 대비 +30.0% 늘었는데, 이는{' '}
                  <strong>
                    주문 확정·제조·픽업 과정에서 마찰이 커졌을 가능성이 있어요
                  </strong>
                  , 그래서 실매출 누수와 고객 불만 리스크가 커질 수 있음을
                  시사해요.
                </p>
              ))}
          </div>
        </div>
        <div>
          <h3 className="text-grey-700 body-medium-semibold mb-4">
            내일 생각해볼 전략 3가지
          </h3>
          <div className="flex flex-col gap-3">
            {Array(3)
              .fill(null)
              .map(() => (
                <p className="bg-grey-100 rounded-200 text-grey-900 body-small-medium [&>strong]:text-brand-main px-4 py-3">
                  취소건수 증가가 이어지는지 확인하기 위해 취소건수와 주문건수를
                  함께 보고, 취소건수 비중이 커지는 흐름인지 점검해봐요.
                </p>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
