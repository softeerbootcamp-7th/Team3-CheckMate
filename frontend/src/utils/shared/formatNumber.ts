export const formatNumber = (value: number) => {
  return value.toLocaleString('ko-KR');
};

export const formatNumberInTenThousands = (num: number) => {
  // 1억 이상이면 '억 원' 단위로 변환
  if (num >= 100000000) {
    return (num / 100000000).toFixed(1) + '억 원';
  }
  // '만 원' 단위로 변환
  return (num / 10000).toFixed(1) + '만 원';
};
