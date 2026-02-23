const SEC = 1000;
const MIN = 60 * SEC;
const HOUR = 60 * MIN;

export const QUERY_CACHE = {
  NO_CACHE: {
    staleTime: 0,
  },
  MUTABLE: {
    //수정 가능(POST/PATCH/DELETE) + 다른 컴퓨터에서 변경하면 현재 화면에도 반영되어야 하는 데이터
    // 단 변경이 자주 발생하지 않음
    staleTime: 15 * MIN,
    gcTime: 9 * HOUR,
  },
  // 기기간 동기화가 중요(열림 확인 등)
  MUTABLE_SYNC: {
    staleTime: 1 * MIN,
    gcTime: 5 * MIN, // 옛날 데이터를 굳이 오래 들고 있을 필요 없음
  },
  IMMUTABLE: {
    // 변하지 않는 데이터 -> 영구적으로 캐싱.
    staleTime: Infinity,
    gcTime: Infinity,
  },
} as const;
