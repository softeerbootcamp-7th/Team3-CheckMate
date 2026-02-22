// 시간이 들어오면 다음 시간대 (예: 9 -> 10, 23 -> 24, 24 -> 1)를 반환하는 함수
// 24가 들어오면 1 반환해야함
export const getNextHour = (hour: number): number => {
  return hour === 24 ? 1 : hour + 1;
};

// 시간이 들어오면 '09시', '10시'와 같이 2자리 숫자에 '시'를 붙여서 반환하는 함수
export const getHourLabel = (hour: number): string => {
  return hour < 10 ? `0${hour}시` : `${hour}시`;
};
