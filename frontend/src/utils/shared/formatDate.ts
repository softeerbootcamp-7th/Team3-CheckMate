/**
 * @description 인자로 주어진 date를 YYYY.MM.DD 형식으로 포맷팅
 * @param date - 포맷팅할 date
 * @returns - 포맷팅된 date string 또는 null
 */
export const formatDateYYYYMMDD = (date?: Date) => {
  if (!date) {
    return null;
  }

  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
};

/**
 * @description 인자로 주어진 date를 YYYY.MM 형식으로 포맷팅
 * @param date - 포맷팅할 date
 * @returns - 포맷팅된 date string 또는 null
 */
export const formatDateYYYYMM = (date?: Date) => {
  if (!date) {
    return null;
  }

  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
  }).format(date);
};

export const formatDateLocalized = (date?: Date) => {
  if (!date) {
    return null;
  }
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatDateISO = (date: Date) => {
  return date.toISOString().slice(0, 10);
};
