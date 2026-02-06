export const STORE_BUSINESS_WEEK_DAY_LIST = [
  {
    label: '월',
    id: 'MON',
  },
  {
    label: '화',
    id: 'TUE',
  },
  {
    label: '수',
    id: 'WED',
  },
  {
    label: '목',
    id: 'THU',
  },
  {
    label: '금',
    id: 'FRI',
  },
  {
    label: '토',
    id: 'SAT',
  },
  {
    label: '일',
    id: 'SUN',
  },
] as const;

export type StoreBusinessWeekDay =
  (typeof STORE_BUSINESS_WEEK_DAY_LIST)[number];
