import { useLayoutEffect, useMemo, useRef, useState } from 'react';

import type { BarLineChartSeries } from '@/types/shared';
import {
  calculateMaximumY,
  getCoordinate,
  getXCoordinate,
} from '@/utils/shared';

interface UseBarLineChartProps {
  viewBoxWidth: number;
  viewBoxHeight: number;
  barLineChartSeries: BarLineChartSeries;
  hasXAxis?: boolean;
}

export const useBarLineChart = ({
  viewBoxWidth,
  viewBoxHeight,
  barLineChartSeries,
  hasXAxis = false,
}: UseBarLineChartProps) => {
  const [adjustedHeight, setAdjustedHeight] = useState<number>(viewBoxHeight);

  const svgRef = useRef<SVGSVGElement>(null);
  const xAxisRef = useRef<SVGPathElement>(null);

  const xLabelList = useMemo(() => {
    return barLineChartSeries.data.mainX.map((datum) => datum.amount ?? '');
  }, [barLineChartSeries.data.mainX]);

  const xCoordinate = useMemo(() => {
    if (barLineChartSeries.data.mainX.length === 0) {
      return [];
    }
    return getXCoordinate({
      svgWidth: viewBoxWidth,
      xDataLength: barLineChartSeries.data.mainX.length,
    });
  }, [viewBoxWidth, barLineChartSeries.data.mainX.length]);

  const barMaximumY = useMemo(() => {
    return calculateMaximumY(barLineChartSeries.data.mainY);
  }, [barLineChartSeries.data.mainY]);

  const barCoordinate = useMemo(() => {
    if (barLineChartSeries.data.mainY.length === 0) {
      return [];
    }
    return getCoordinate({
      svgWidth: viewBoxWidth,
      adjustedHeight,
      series: barLineChartSeries,
      maximumY: barMaximumY,
    });
  }, [viewBoxWidth, adjustedHeight, barLineChartSeries, barMaximumY]);

  const lineMaximumY = useMemo(() => {
    return calculateMaximumY(barLineChartSeries.data.subY);
  }, [barLineChartSeries.data.subY]);

  const lineCoordinate = useMemo(() => {
    if (barLineChartSeries.data.subY.length === 0) {
      return [];
    }
    return getCoordinate({
      svgWidth: viewBoxWidth,
      adjustedHeight,
      series: barLineChartSeries,
      maximumY: lineMaximumY,
    });
  }, [viewBoxWidth, adjustedHeight, barLineChartSeries, lineMaximumY]);

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
    svgRef,
    xAxisRef,
    svgWidth: viewBoxWidth,
    adjustedHeight,
    xLabelList,
    xCoordinate,
    barCoordinate,
    lineCoordinate,
  };
};
