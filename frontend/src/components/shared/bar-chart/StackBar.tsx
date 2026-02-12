import { useRef } from 'react';

import { useBarInitAnimation } from '@/hooks/shared';
import type { StackBarSegment } from '@/types/shared';
import { getBarSegmentInfoList } from '@/utils/shared';

import { Bar } from './Bar';

interface StackBarProps {
  stackBarData: StackBarSegment[];
  barMiddleX: number;
  barTopY: number;
  width: number;
  height: number;
  radius?: number;
  hasAnimation?: boolean;
  tooltipContent?: (...args: string[]) => string;
}

export const StackBar = ({
  stackBarData,
  barMiddleX,
  barTopY,
  width,
  height,
  radius = Math.min(height, width, 4),
  hasAnimation = true,
  tooltipContent,
}: StackBarProps) => {
  // 마운트 시 등장 애니메이션: 아래에서 위로 올라오기(scaley 0 -> 1)
  const barRef = useRef<SVGGElement>(null);

  // 애니메이션
  useBarInitAnimation({ barRef, hasAnimation });

  // 스택 바 내 전체 데이터 합계 계산 (비율 산정용)
  const totalAmount = stackBarData.reduce(
    (acc, cur) => acc + (Number(cur.amount) || 0),
    0,
  );
  // 각 조각 바에 대한 정보(y 좌표, 높이, 비율 등) 계산
  const barSegmentInfoList = getBarSegmentInfoList({
    stackBarData,
    barTopY,
    barHeight: height,
    totalAmount,
  });

  const getTooltipContent = (label: string, percentage: number) => {
    if (tooltipContent) {
      return tooltipContent(
        label,
        `${Math.round((percentage / 100) * totalAmount)}건`,
        '(',
        `${percentage}%`,
        ')',
      );
    }
    return null;
  };

  return (
    <>
      <g
        ref={barRef}
        style={{
          transformOrigin: `${barMiddleX}px ${barTopY + height}px`,
        }}
      >
        {barSegmentInfoList.map((segment, index) => {
          return (
            <Bar
              key={`${segment.label}-${index}`}
              barMiddleX={barMiddleX}
              barTopY={segment.y}
              width={width}
              height={segment.barHeight}
              bgColor={segment.color ?? '#eee'}
              radius={index === 0 ? radius : 0}
              hasInitAnimation={false} // 그룹 전체에 애니메이션이 있으므로 개별 Bar는 끔
              hasMoveAnimation={true}
              hasGradient={false}
              activeTooltip={true}
              tooltipContentText={
                getTooltipContent(segment.label, segment.percentage) || ''
              }
            />
          );
        })}
      </g>
    </>
  );
};
