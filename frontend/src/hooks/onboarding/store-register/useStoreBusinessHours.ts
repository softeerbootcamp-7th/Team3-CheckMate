import { useCallback, useMemo } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import {
  STORE_BUSINESS_WEEK_DAY_LIST,
  STORE_REGISTER_FORM_FIELD,
} from '@/constants/onboarding/store-register';
import type { StoreRegisterForm } from '@/types/onboarding/store-register';
import {
  checkStoreBusinessHoursIsOver24,
  validateStoreBusinessHours,
} from '@/utils/onboarding/store-register';

export const useStoreBusinessHours = () => {
  const { control } = useFormContext<StoreRegisterForm>();

  const {
    field: { value, onChange },
  } = useController({
    name: `${STORE_REGISTER_FORM_FIELD.BUSINESS_HOUR_REQUESTS}`,
    control,
    rules: {
      validate: validateStoreBusinessHours,
    },
  });

  // 영업 시간 시작 선택 handler
  const handleSelectStartTime = useCallback(
    (index: number) => (openTime: string) => {
      if (
        value.every(
          (businessHour) =>
            !businessHour.openTime &&
            !businessHour.is24 &&
            !businessHour.closed,
        )
      ) {
        const newBusinessHours = value.map((businessHour) => {
          return {
            ...businessHour,
            openTime,
            closed: undefined,
            is24: undefined,
            isOver24: checkStoreBusinessHoursIsOver24(
              openTime,
              businessHour.closeTime,
            ),
          };
        });
        onChange(newBusinessHours);
        return;
      }

      onChange(
        value.map((businessHour, idx) => {
          if (idx === index) {
            return {
              ...businessHour,
              openTime,
              closed: undefined,
              is24: undefined,
              isOver24: checkStoreBusinessHoursIsOver24(
                openTime,
                businessHour.closeTime,
              ),
            };
          }
          return businessHour;
        }),
      );
    },
    [value, onChange],
  );

  // 영업 시간 마감 선택 handler
  const handleSelectEndTime = useCallback(
    (index: number) => (closeTime: string) => {
      if (
        value.every(
          (businessHour) =>
            !businessHour.closeTime &&
            !businessHour.is24 &&
            !businessHour.closed,
        )
      ) {
        const newBusinessHours = value.map((businessHour) => {
          return {
            ...businessHour,
            closeTime,
            closed: undefined,
            is24: undefined,
            isOver24: checkStoreBusinessHoursIsOver24(
              businessHour.openTime,
              closeTime,
            ),
          };
        });
        onChange(newBusinessHours);
        return;
      }

      onChange(
        value.map((businessHour, idx) => {
          if (idx === index) {
            return {
              ...businessHour,
              closeTime,
              closed: undefined,
              is24: undefined,
              isOver24: checkStoreBusinessHoursIsOver24(
                businessHour.openTime,
                closeTime,
              ),
            };
          }
          return businessHour;
        }),
      );
    },
    [value, onChange],
  );

  // 24시 선택 handler
  const handleCheck24 = useCallback(
    (index: number) => (is24: boolean) => {
      onChange(
        value.map((businessHour, idx) => {
          if (idx === index) {
            if (is24) {
              return {
                ...businessHour,
                is24,
                closed: undefined,
                isOver24: undefined,
                closeTime: '',
                openTime: '',
              };
            }
            return { ...businessHour, is24 };
          }
          return businessHour;
        }),
      );
    },
    [value, onChange],
  );

  // 휴무 선택 handler
  const handleCheckClosed = useCallback(
    (index: number) => (closed: boolean) => {
      onChange(
        value.map((businessHour, idx) => {
          if (idx === index) {
            if (closed) {
              return {
                ...businessHour,
                closed,
                is24: undefined,
                isOver24: undefined,
                openTime: '',
                closeTime: '',
              };
            }
            return { ...businessHour, closed };
          }
          return businessHour;
        }),
      );
    },
    [value, onChange],
  );

  // 영업 시간 시작 시간 제한
  const startHourTimeLimit = useMemo(() => {
    const timeLimit: Record<
      number,
      StoreRegisterForm['businessHourRequests'][number]['closeTime']
    > = {};

    value.forEach((businessHour, index) => {
      timeLimit[(index + 1) % STORE_BUSINESS_WEEK_DAY_LIST.length] =
        businessHour.closeTime;
    });

    return timeLimit;
  }, [value]);

  // 영업 시간 마감 시간 제한
  const endHourTimeLimit = useMemo(() => {
    const timeLimit: Record<
      number,
      StoreRegisterForm['businessHourRequests'][number]['openTime']
    > = {};

    value.forEach((businessHour, index) => {
      timeLimit[index] = businessHour.openTime;
    });

    return timeLimit;
  }, [value]);

  // 영업 시간이 자정을 넘어가는지 체크
  const isOver24FromYesterday = useMemo(() => {
    const over24: Record<number, boolean | undefined> = {};

    value.forEach((businessHour, index) => {
      over24[(index + 1) % STORE_BUSINESS_WEEK_DAY_LIST.length] =
        businessHour.isOver24;
    });

    return over24;
  }, [value]);

  return {
    value,
    startHourTimeLimit,
    endHourTimeLimit,
    isOver24FromYesterday,
    handleSelectStartTime,
    handleSelectEndTime,
    handleCheck24,
    handleCheckClosed,
  };
};
