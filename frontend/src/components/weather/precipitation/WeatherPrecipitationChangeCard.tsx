import { CircleArrowRight } from 'lucide-react';

// const PrecipitationSalesChangeItem = () => {
//   return (
//     <div className="flex w-24.5 flex-col gap-px">
//       <p className="body-medium-semibold text-center">평균 주문수</p>
//       <p className="number-semibold-40 text-center">
//         -31<span className="number-semibold-28">%</span>
//       </p>
//     </div>
//   );
// };
// const mockPrecipitationChangeList = [
//   {
//     changeType: '평균 주문수',
//     percentage: -31,
//   },
//   {
//     changeType: '평균 매출',
//     percentage: -31,
//   },
// ];

export const WeatherPrecipitationChangeCard = () => {
  return (
    <section className="bg-special-card-bg rounded-400 h-57 flex-1 p-5">
      <h3 className="body-medium-semibold gray-700">
        강수 주문수 및 매출 변화
      </h3>
      <div className="mt-8 flex h-18.5 w-full justify-center gap-7">
        <div className="flex w-24.5 flex-col gap-px">
          <p className="body-medium-semibold text-center">평균 매출</p>
          <p className="number-semibold-40 text-center">
            -31<span className="number-semibold-28">%</span>
          </p>
        </div>

        <div className="bg-grey-300 h-full w-[1px]" />
        <div className="flex w-24.5 flex-col gap-px">
          <p className="body-medium-semibold text-center">평균 매출</p>
          <p className="number-semibold-40 text-center">
            -31<span className="number-semibold-28">%</span>
          </p>
        </div>
      </div>
      <p className="body-small-medium mt-10 flex items-center gap-1 text-gray-900">
        <CircleArrowRight className="size-5" />
        강수일에는 평균 주문수와 매출이 감소했어요.
      </p>
    </section>
  );
};
