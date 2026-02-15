import { useLayoutEffect, useMemo, useRef, useState } from 'react';

import type { LineChartSeries } from '@/types/shared';
import {
  filterCoordinate,
  getCoordinate,
  getXCoordinate,
} from '@/utils/shared';

interface UseLineChartProps {
  viewBoxWidth: number;
  viewBoxHeight: number;
  primarySeries: LineChartSeries;
  secondarySeries?: LineChartSeries;
  hasXAxis?: boolean;
}

export const useLineChart = ({
  viewBoxWidth,
  viewBoxHeight,
  primarySeries,
  secondarySeries,
  hasXAxis = false,
}: UseLineChartProps) => {
  const [adjustedHeight, setAdjustedHeight] = useState<number>(viewBoxHeight);

  const svgRef = useRef<SVGSVGElement>(null);
  const xAxisRef = useRef<SVGPathElement>(null);

  const xLabelList = useMemo(() => {
    return primarySeries.data.mainX.map((datum) => datum.amount ?? '');
  }, [primarySeries.data.mainX]);

  const xCoordinate = useMemo(() => {
    if (primarySeries.data.mainX.length === 0) {
      return [];
    }
    return getXCoordinate({
      svgWidth: viewBoxWidth,
      xDataLength: primarySeries.data.mainX.length,
    });
  }, [viewBoxWidth, primarySeries.data.mainX.length]);

  const maximumY = useMemo(() => {
    const totalData = [
      ...primarySeries.data.mainY.map((datum) => datum.amount),
      ...(secondarySeries?.data.mainY.map((datum) => datum.amount) ?? []),
    ].flat();

    const maximumAmount =
      totalData.length > 0
        ? Math.max(...totalData.filter((amount) => amount !== null).map(Number))
        : 10;

    const adjustedMaximumAmount =
      Math.ceil(Math.ceil(maximumAmount * 1.5) / 10) * 10;

    return adjustedMaximumAmount;
  }, [primarySeries.data.mainY, secondarySeries?.data.mainY]);

  const primaryCoordinate = useMemo(() => {
    if (primarySeries.data.mainX.length === 0) {
      return [];
    }
    return getCoordinate({
      svgWidth: viewBoxWidth,
      adjustedHeight,
      series: primarySeries,
      maximumY,
    });
  }, [viewBoxWidth, adjustedHeight, primarySeries, maximumY]);

  const lastXCoordinate = useMemo(() => {
    const filteredCoordinate = filterCoordinate(primaryCoordinate);

    if (filteredCoordinate.length === 0) {
      return 0;
    }

    return filteredCoordinate[filteredCoordinate.length - 1].x;
  }, [primaryCoordinate]);

  const secondaryCoordinate = useMemo(() => {
    if (
      secondarySeries === undefined ||
      secondarySeries.data.mainX.length === 0
    ) {
      return [];
    }
    return getCoordinate({
      svgWidth: viewBoxWidth,
      adjustedHeight,
      series: secondarySeries,
      maximumY,
    });
  }, [viewBoxWidth, adjustedHeight, secondarySeries, maximumY]);

  useLayoutEffect(() => {
    const updateAdjustedHeight = () => {
      if (!hasXAxis || !xAxisRef.current) {
        setAdjustedHeight(viewBoxHeight);
        return;
      }
      const xAxisBBox = xAxisRef.current.getBBox();
      setAdjustedHeight(xAxisBBox.y + xAxisBBox.height / 2);
    };
    updateAdjustedHeight();
  }, [hasXAxis, viewBoxHeight]);

  return {
    svgWidth: viewBoxWidth,
    adjustedHeight,
    xLabelList,
    xCoordinate,
    lastXCoordinate,
    primaryCoordinate,
    secondaryCoordinate,
    svgRef,
    xAxisRef,
    filterCoordinate,
  };
};
