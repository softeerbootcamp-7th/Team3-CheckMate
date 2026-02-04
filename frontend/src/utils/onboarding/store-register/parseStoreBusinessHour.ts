/**
 * @description HH:mm 형식의 시간을 시간과 분으로 분리하여 반환, 반드시 HH:mm 형식으로 입력되어야 함
 * @param time HH:mm 형식의 시간
 * @returns { hour: number, minute: number }
 */
export const parseStoreBusinessHour = (time: string) => {
  const [hour, minute] = time.split(':').map(Number);
  return {
    hour,
    minute,
  };
};
