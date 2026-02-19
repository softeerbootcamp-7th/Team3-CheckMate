import type {
  AllBarChartSeries,
  BarChartDatum,
  StackBarDatum,
} from '@/types/shared';

// 바 위에 표시될 라벨 내용 텍스트 생성
export const getLabelContentText = ({
  isStackBar,
  index,
  series,
}: {
  isStackBar: boolean;
  index: number;
  series: AllBarChartSeries;
}) => {
  if (isStackBar) {
    // 스택바 그래프일 때는 mainY의 각 항목이 배열이므로 각 스택의 합계를 계산하여 라벨에 표시
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
    // 일반 바 그래프일 때는 mainY의 단일 값을 라벨에 표시
    const value = series.data.mainY[index] as BarChartDatum;
    return `${value.amount} ${value.unit}`;
  }
};
