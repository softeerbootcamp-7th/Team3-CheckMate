import {
  createContext,
  type Dispatch,
  type RefObject,
  type SetStateAction,
} from 'react';

import type { DashboardCard, DragState, GhostState } from '@/types/dashboard';

interface EditCardContextType {
  dashboardId: number;

  initPlacedCards: DashboardCard[];

  placedCards: DashboardCard[];
  setPlacedCards: Dispatch<SetStateAction<DashboardCard[]>>;

  gridRef: RefObject<HTMLDivElement | null>;

  dragState: DragState | null;
  setDragState: Dispatch<SetStateAction<DragState | null>>;

  ghost: GhostState | null;
  setGhost: Dispatch<SetStateAction<GhostState | null>>;

  tempLayout: DashboardCard[] | null;
  setTempLayout: Dispatch<SetStateAction<DashboardCard[] | null>>;

  isOverList: boolean;
  setIsOverList: Dispatch<SetStateAction<boolean>>;
}

export const EditCardContext = createContext<EditCardContextType | undefined>(
  undefined,
);
