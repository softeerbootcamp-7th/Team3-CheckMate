import { useLayoutEffect, useMemo, useRef, useState } from 'react';

import type {
  BarChartDatum,
  BarChartSeries,
  StackBarDatum,
} from '@/types/shared';
import type { AllBarChartSeries } from '@/types/shared/bar-chart';
import { getCoordinate, getXCoordinate } from '@/utils/shared';
import { checkIsStackBarChart } from '@/utils/shared/bar-chart';

interface UseBarChartProps {
  barChartSeries: AllBarChartSeries;
  hasXAxis?: boolean;
}

export const useBarChart = ({
  barChartSeries,
  hasXAxis = false,
}: UseBarChartProps) => {
  const [svgRect, setSvgRect] = useState<DOMRect | null>(null);
  const [adjustedHeight, setAdjustedHeight] = useState<number>(0);

  const svgRef = useRef<SVGSVGElement>(null);
  const xAxisRef = useRef<SVGPathElement>(null);

  const isStackBarChart = checkIsStackBarChart({ series: barChartSeries });

  const xLabelList = useMemo(() => {
    return barChartSeries.data.mainX.map((datum) => datum.amount ?? '');
  }, [barChartSeries.data.mainX]);

  const xCoordinate = useMemo(() => {
    if (svgRect === null) {
      return [];
    }
    return getXCoordinate({
      svgRect,
      xDataLength: barChartSeries.data.mainX.length,
    });
  }, [svgRect, barChartSeries.data.mainX.length]);

  //
  const maximumY = useMemo(() => {
    const totalData = isStackBarChart
      ? (barChartSeries.data.mainY as StackBarDatum[]).map((stack) =>
          stack.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0),
        )
      : (barChartSeries.data.mainY as BarChartDatum[]).map(
          (datum) => datum.amount,
        );

    const maximumAmount =
      totalData.length > 0
        ? Math.max(...totalData.filter((amount) => amount !== null).map(Number))
        : 10;

    const adjustedMaximumAmount = // 가장 큰 값보다 1.5배 큰 값으로 설정
      Math.ceil(Math.ceil(maximumAmount * 1.5) / 10) * 10;

    return adjustedMaximumAmount;
  }, [barChartSeries.data.mainY, isStackBarChart]);
  const primaryCoordinate = useMemo(() => {
    if (svgRect === null) {
      return [];
    }
    // 만약 stackBarChart면 스택별로 데이터를 하나의 바로 합친 후 좌표를 계산해야 함
    const barSeriesForCoordinate = isStackBarChart
      ? {
          ...barChartSeries,
          data: {
            ...barChartSeries.data,
            mainY: (barChartSeries.data.mainY as StackBarDatum[]).map(
              (stack) => ({
                // 해당 스택바의 모든 스택 조각 amount를 더함
                amount: stack.reduce(
                  (acc, curr) => acc + (Number(curr.amount) || 0),
                  0,
                ),
                unit: stack[0]?.unit || '', // 첫 번째 조각의 단위를 대표로 사용
              }),
            ),
          },
        }
      : barChartSeries;

    return getCoordinate({
      svgRect,
      adjustedHeight,
      series: barSeriesForCoordinate as BarChartSeries,
      maximumY,
    });
  }, [svgRect, adjustedHeight, barChartSeries, maximumY, isStackBarChart]);

  useLayoutEffect(() => {
    if (!svgRef.current) {
      return;
    }
    setSvgRect(svgRef.current.getBoundingClientRect());
    setAdjustedHeight(svgRef.current.getBoundingClientRect().height);
    if (hasXAxis && xAxisRef.current) {
      setAdjustedHeight(
        xAxisRef.current.getBoundingClientRect().y -
          svgRef.current.getBoundingClientRect().y +
          xAxisRef.current.getBoundingClientRect().height / 2,
      );
    }
  }, [svgRef, xAxisRef, hasXAxis]);

  return {
    svgRect,
    adjustedHeight,
    xLabelList,
    xCoordinate,
    primaryCoordinate,
    svgRef,
    xAxisRef,
  };
};
