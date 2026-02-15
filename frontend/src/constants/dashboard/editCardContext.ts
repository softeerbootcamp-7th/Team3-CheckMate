import { createContext, type Dispatch, type SetStateAction } from 'react';

import type { MetricCardCode } from './dashboardMetricCards';

interface EditCardContextType {
  initGrid: (MetricCardCode | null)[][];
  grid: (MetricCardCode | null)[][];
  setGrid: Dispatch<SetStateAction<(MetricCardCode | null)[][]>>;
}

export const EditCardContext = createContext<EditCardContextType | undefined>(
  undefined,
);
