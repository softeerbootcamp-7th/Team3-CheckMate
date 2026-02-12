import { type PropsWithChildren, useState } from 'react';

import { EditCardContext } from '@/constants/dashboard/editCardContext';

const EMPTY_GRID: string[][] = [
  ['', '', '', ''],
  ['', '', '', ''],
  ['', '', '', ''],
  ['', '', '', ''],
];
export const EditCardProvider = ({ children }: PropsWithChildren) => {
  const initGrid = EMPTY_GRID; // TODO: 초기 그리드 상태 서버에서 받아오기
  const [grid, setGrid] = useState<string[][]>(EMPTY_GRID);

  return (
    <EditCardContext.Provider value={{ initGrid, grid, setGrid }}>
      {children}
    </EditCardContext.Provider>
  );
};
