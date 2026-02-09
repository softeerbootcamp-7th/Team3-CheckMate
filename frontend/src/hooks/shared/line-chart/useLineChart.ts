import { useLayoutEffect, useMemo, useRef, useState } from 'react';

import type { LineChartSeries } from '@/types/shared';
import { getCordinate } from '@/utils/shared';

interface UseLineChartProps {
  primarySeries: LineChartSeries;
  secondarySeries?: LineChartSeries;
  hasXAxis?: boolean;
}

export const useLineChart = ({
  primarySeries,
  secondarySeries,
  hasXAxis = false,
}: UseLineChartProps) => {
  const [svgRect, setSvgRect] = useState<DOMRect | null>(null);
  const [adjustedHeight, setAdjustedHeight] = useState<number>(0);

  const svgRef = useRef<SVGSVGElement>(null);
  const xAxisRef = useRef<SVGPathElement>(null);

  const maximumY = useMemo(() => {
    const totalData = [
      ...primarySeries.data.mainY.map((datum) => datum.amount),
      ...(secondarySeries?.data.mainY.map((datum) => datum.amount) ?? []),
    ].flat();

    const maximumAmount = Math.max(
      ...totalData.filter((amount) => amount !== null).map(Number),
    );

    const adjustedMaximumAmount =
      Math.ceil(Math.ceil(maximumAmount * 1.5) / 10) * 10;

    return adjustedMaximumAmount;
  }, [primarySeries.data.mainY, secondarySeries?.data.mainY]);

  const primaryCordinate = useMemo(() => {
    if (svgRect === null) {
      return [];
    }
    return getCordinate({
      svgRect,
      adjustedHeight,
      series: primarySeries,
      maximumY,
    });
  }, [svgRect, adjustedHeight, primarySeries, maximumY]);

  const secondaryCordinate = useMemo(() => {
    if (svgRect === null || secondarySeries === undefined) {
      return [];
    }
    return getCordinate({
      svgRect,
      adjustedHeight,
      series: secondarySeries,
      maximumY,
    });
  }, [svgRect, adjustedHeight, secondarySeries, maximumY]);

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
    primaryCordinate,
    secondaryCordinate,
    svgRef,
    xAxisRef,
  };
};
