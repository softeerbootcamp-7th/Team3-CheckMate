// 가격에 콤마(,)를 추가하는 함수

// toLocaleString('ko-KR') : 한국어(대한민국) 형식(3자리마다 ,)으로 숫자를 포맷팅하여 콤마를 추가
export const formatPriceWithComma = (price: number): string => {
  return price.toLocaleString('ko-KR');
};
