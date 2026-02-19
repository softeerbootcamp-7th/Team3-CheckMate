// 시간이 들어오면 다음 시간대 (예: 9 -> 10, 23 -> 24, 24 -> 1)를 반환하는 함수
// 24가 들어오면 1 반환해야함
export const getNextHour = (hour: number): number => {
  return hour === 24 ? 1 : hour + 1;
};
