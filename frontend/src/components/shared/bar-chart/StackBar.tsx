import { useRef } from 'react';

import { useBarInitAnimation } from '@/hooks/shared';
import type { StackBarSegment } from '@/types/shared';
import { getBarSegmentInfoList, getStackTotalAmount } from '@/utils/shared';

import { Bar } from './Bar';

interface StackBarProps {
  stackBarData: StackBarSegment[];
  barMiddleX: number;
  barTopY: number;
  width: number;
  height: number;
  radius?: number;
  hasAnimation?: boolean;
  activeTooltip?: boolean;
  tooltipContent?: (...args: string[]) => string;
}

export const StackBar = ({
  stackBarData,
  barMiddleX,
  barTopY,
  width,
  height,
  radius,
  hasAnimation = true,
  activeTooltip = true,
  tooltipContent,
}: StackBarProps) => {
  // 마운트 시 등장 애니메이션: 아래에서 위로 올라오기(scaley 0 -> 1)
  const barRef = useRef<SVGGElement>(null);

  // 애니메이션
  useBarInitAnimation({ barRef, hasAnimation });

  // 스택 바 내 전체 데이터 합계 계산 (비율 산정용)
  const totalAmount = getStackTotalAmount({ stackBarData });
  const barSegmentCount = stackBarData.length; // 스택 바를 구성하는 조각 바의 개수
  // 각 조각 바에 대한 정보(y 좌표, 높이, 비율 등) 계산
  const barSegmentInfoList = getBarSegmentInfoList({
    stackBarData,
    barTopY,
    barHeight: height,
    totalAmount,
    barSegmentCount,
  });

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
              key={index}
              barMiddleX={barMiddleX}
              barTopY={segment.y}
              width={width}
              height={segment.barHeight}
              bgColor={segment.color ?? '#eee'}
              radius={index === 0 ? radius : 0}
              hasInitAnimation={false} // 그룹 전체에 애니메이션이 있으므로 개별 Bar는 끔
              hasMoveAnimation={true}
              hasGradient={false}
              activeTooltip={activeTooltip}
              barColorChangeOnHover={false}
              tooltipContentText={
                tooltipContent?.(
                  segment.label,
                  segment.amount.toString(),
                  `${segment.percentage.toString()}%`,
                ) ?? ''
              }
            />
          );
        })}
      </g>
    </>
  );
};
