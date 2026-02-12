import { createContext, type Dispatch, type SetStateAction } from 'react';

interface EditCardContextType {
  initGrid: string[][];
  grid: string[][];
  setGrid: Dispatch<SetStateAction<string[][]>>;
}

export const EditCardContext = createContext<EditCardContextType | undefined>(
  undefined,
);
