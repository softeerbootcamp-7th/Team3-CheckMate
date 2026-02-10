import {
  createContext,
  type PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react';

import {
  PERIOD_PRESETS,
  type PeriodPresetType,
  type PeriodType,
} from '@/constants/shared';

interface PeriodTypeContextState<T extends PeriodPresetType> {
  periodType: PeriodType<T> | undefined;
  startDate?: Date;
  endDate?: Date;
}

interface PeriodTypeContextAction<T extends PeriodPresetType> {
  setPeriodType: (periodType: PeriodType<T> | undefined) => void;
  setStartDate: (date?: Date) => void;
  setEndDate: (date?: Date) => void;
}

interface createPeriodTypeProviderOptions<T extends PeriodPresetType> {
  periodPreset: T;
}

export const createPeriodTypeProvider = <T extends PeriodPresetType>({
  periodPreset,
}: createPeriodTypeProviderOptions<T>) => {
  const periodTypeContext = createContext<
    PeriodTypeContextState<T> & PeriodTypeContextAction<T>
  >({
    periodType: undefined,
    startDate: undefined,
    endDate: undefined,
    setPeriodType: () => {},
    setStartDate: () => {},
    setEndDate: () => {},
  });

  const usePeriodTypeContext = () => {
    const context = useContext(periodTypeContext);

    if (!context) {
      throw new Error('periodTypeContext not found');
    }

    return context as PeriodTypeContextState<T> & PeriodTypeContextAction<T>;
  };

  const PeriodTypeProvider = ({ children }: PropsWithChildren) => {
    const [periodType, setPeriodType] = useState<PeriodType<T> | undefined>(
      Object.values(PERIOD_PRESETS[periodPreset])[0] as PeriodType<T>,
    );
    const [startDate, setStartDate] = useState<Date | undefined>(undefined);
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);

    const value = useMemo(
      () => ({
        periodType,
        startDate,
        endDate,
        setPeriodType,
        setStartDate,
        setEndDate,
      }),
      [periodType, startDate, endDate],
    );

    return (
      <periodTypeContext.Provider value={value}>
        {children}
      </periodTypeContext.Provider>
    );
  };

  return {
    periodTypeContext,
    PeriodTypeProvider,
    usePeriodTypeContext,
  } as const;
};
