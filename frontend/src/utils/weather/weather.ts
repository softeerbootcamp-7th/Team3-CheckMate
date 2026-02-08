/**
 * @description - date받아서 오늘이면 '오늘' 반환하고, 그 외에는 해당 요일 반환하는 유틸 함수
 * @param date -포멧팅할 date
 * @returns - '오늘' 또는 일월화수목금토
 */
export const formatDayLabel = (date?: Date) => {
  if (!date) {
    return null;
  }
  const today = new Date();

  // 오늘에 해당하는 날짜면 '오늘' 반환
  const isSameDay =
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate();

  if (isSameDay) {
    return '오늘';
  }

  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  return weekdays[date.getDay()]; // getDay: 일=0, 월=1, 화=2..
};

/**
 * 시간별 날씨 예보 카드에 사용되는 시간 라벨
 * @description - date받아서 시간이 현재면 '지금', 그 외에는 '00시'를 반환하는  유틸 함수
 * @param date -포멧팅할 date
 * @returns - '지금' 또는 '{00}시'
 */

export const formatHourlyTimeLabel = (date?: Date) => {
  if (!date) {
    return null;
  }
  const inputHour = date.getHours();
  const nowHour = new Date().getHours(); // 현재 몇시인지
  if (inputHour === nowHour) {
    return '지금';
  } else {
    if (inputHour < 10) {
      return `0${inputHour}시`;
    } else {
      return `${inputHour}시`;
    }
  }
};

/**
 * 원래 오늘 날씨 예보 카드에 사용될 함수인데 날씨 예보 어떻게 줄지 백엔드랑 합의 안되어서 보류... 사용처는 딱히 없음
 * @description - 24시간 형식의 숫자를 받아서 '오전/오후 {n}시' 형식의 문자열로 변환
 * @param date -포멧팅할 date
 * @returns -'오전/오후 {n}시'
 */

export const formatKoreanHourLabel = (date?: Date) => {
  if (!date) {
    return null;
  }
  const hour = date.getHours();

  const period = hour < 12 ? '오전' : '오후'; // 앞에 붙여지는 수식어 오전 or 오후
  const displayHour = hour % 12 === 0 ? 12 : hour % 12; // 12보다 큰 시간 -> 12로 뚝 잘라 -> 14=2시, 16=4시

  return `${period} ${displayHour}시`;
};
