import type { GetDailyReportContentResponseDto } from '@/types/daily-report';

interface DailyReportStrategyProps {
  strategies: GetDailyReportContentResponseDto['strategies'];
}
export const DailyReportStrategy = ({
  strategies,
}: DailyReportStrategyProps) => {
  return (
    <div>
      <h3 className="text-grey-700 body-medium-semibold mb-4">
        내일 생각해볼 전략 3가지
      </h3>
      <div className="flex flex-col gap-3">
        {strategies.map((strategy, index) => (
          <p
            key={`strategy-${index}`} // 일부만 바뀔 일 없으므로 index 사용
            className="bg-grey-100 rounded-200 text-grey-900 body-small-medium [&>strong]:text-brand-main px-4 py-3"
          >
            {strategy}
          </p>
        ))}
      </div>
    </div>
  );
};
