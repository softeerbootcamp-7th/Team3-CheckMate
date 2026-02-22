import type {
  AllBarChartSeries,
  ChartDatum,
  StackBarDatum,
} from '@/types/shared';
import { formatNumberInTenThousands } from '@/utils/shared';

// 바 위에 표시될 라벨 내용 텍스트 생성
export const getLabelContentText = ({
  isStackBar,
  isSubLabel,
  index,
  series,
}: {
  isStackBar: boolean;
  isSubLabel?: boolean; // 서브 라벨인지 여부 (true면 secondarySeries에서 데이터 가져옴)
  index: number;
  series: AllBarChartSeries;
}) => {
  if (isSubLabel && !isStackBar) {
    // 서브 레이블은 스택바 지원 안하도록 일단 제한.
    // 서브 라벨일 때는 원 단위 환산 필요 없음
    const value = series.data.mainY[index] as ChartDatum;
    return `${value.amount}${value.unit}`;
  } else if (isStackBar) {
    // 스택바 그래프의 메인라벨일 때는 mainY의 각 항목이 배열이므로 각 스택의 합계를 계산하여 라벨에 표시
    const stackValues = series.data.mainY[index] as StackBarDatum;
    const total = stackValues.reduce((sum, item) => {
      if (typeof item.amount === 'number') {
        return sum + item.amount;
      }
      return sum;
    }, 0);
    const unit = stackValues[0]?.unit || ''; // 단위는 첫 번째 항목의 단위를 사용
    return `${total} ${unit}`;
  } else {
    // 일반 바 그래프의 메인 라벨일 때는 mainY의 단일 값을 라벨에 표시
    const value = series.data.mainY[index] as ChartDatum;
    return `${formatNumberInTenThousands(Number(value.amount))}${value.unit}`;
  }
};
