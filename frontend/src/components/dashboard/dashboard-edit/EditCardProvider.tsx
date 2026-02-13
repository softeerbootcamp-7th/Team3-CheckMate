import { type PropsWithChildren, useState } from 'react';

import {
  GRID_COL_SIZE,
  GRID_ROW_SIZE,
  type MetricCardCode,
} from '@/constants/dashboard';
import { EditCardContext } from '@/constants/dashboard/editCardContext';

const EMPTY_GRID: (MetricCardCode | null)[][] = Array.from(
  { length: GRID_ROW_SIZE + 1 },
  () => Array.from({ length: GRID_COL_SIZE + 1 }, () => null),
);

export const EditCardProvider = ({ children }: PropsWithChildren) => {
  const initGrid = EMPTY_GRID; // TODO: 초기 그리드 상태 서버에서 받아오기
  const [grid, setGrid] = useState<(MetricCardCode | null)[][]>(EMPTY_GRID);

  return (
    <EditCardContext.Provider value={{ initGrid, grid, setGrid }}>
      {children}
    </EditCardContext.Provider>
  );
};
