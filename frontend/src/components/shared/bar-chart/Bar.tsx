import { useId, useRef } from 'react';

import { BAR_CHART } from '@/constants/shared';
import { useDrawBarPath } from '@/hooks/shared';
import { useBarInitAnimation } from '@/hooks/shared';
import { usePathDAnimation } from '@/hooks/shared';

import { Tooltip, TooltipContent, TooltipTrigger } from '../shadcn-ui';

interface BarProps {
  barMiddleX: number; // 바 정중앙 x 좌표
  barTopY: number; // 바 상단 y 좌표
  width: number;
  height: number; // 바 높이
  radius?: number; // top rounded 줄지 말지
  hasInitAnimation?: boolean; // 처음 등장시 위로 차오르는 애니메이션 줄지 말지
  hasMoveAnimation?: boolean; // 막대 위치 이동 시 애니메이션 줄지 말지

  hasGradient?: boolean; // 그라데이션 줄지말지
  activeTooltip?: boolean; // 툴팁 적용 여부
  tooltipContentText?: string; //
  bgColor?: string;
}

export const Bar = ({
  barMiddleX,
  barTopY,
  width,
  height,
  radius,
  hasInitAnimation = true,
  hasMoveAnimation = true,
  hasGradient = true,
  activeTooltip = false,
  tooltipContentText,
  bgColor = BAR_CHART.DEFAULT_BAR_COLOR,
}: BarProps) => {
  const pathRef = useRef<SVGPathElement>(null);
  const barRef = useRef<SVGGElement>(null); // g 태그 조작(막대 위치 이동시 애니메이션)을 위한 ref
  const adjustedRadius = Math.min(radius ?? 0, width / 2, height); // 반지름이 바의 높이, 너비보다 커서 그래프 깨지는 문제 방지
  const { pathD } = useDrawBarPath({
    barMiddleX,
    barTopY,
    width,
    height,
    radius: adjustedRadius,
  });
  const gradientId = useId();
  const fill = hasGradient && gradientId ? `url(#${gradientId})` : bgColor;

  // 마운트 시 등장 애니메이션: 아래에서 위로 올라오기(scaley 0 -> 1)
  useBarInitAnimation({ barRef, hasAnimation: hasInitAnimation });
  // path 애니메이션: d 속성 변경 시 애니메이션 적용
  usePathDAnimation({ pathRef, hasAnimation: hasMoveAnimation });

  return (
    <>
      {hasGradient && (
        <defs>
          {/* 아래 에서 위 방향으로 그라데이션 */}
          <linearGradient id={gradientId} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor={bgColor} stopOpacity={0.1} />
            <stop offset="100%" stopColor={bgColor} stopOpacity={0.4} />
          </linearGradient>
        </defs>
      )}
      <g
        ref={barRef}
        style={{
          transformOrigin: `${barMiddleX}px ${barTopY + height}px`,
        }}
      >
        {activeTooltip ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <path ref={pathRef} d={pathD} fill={fill} />
            </TooltipTrigger>
            <TooltipContent
              side="left"
              className="bg-grey-800 transition-duration-200 px-250! text-gray-50 [&_svg]:invisible"
            >
              {tooltipContentText}
            </TooltipContent>
          </Tooltip>
        ) : (
          <path ref={pathRef} d={pathD} fill={fill} />
        )}
      </g>
    </>
  );
};
